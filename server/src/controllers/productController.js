const slugify = require("slugify");
const User = require("../models/User");
const Product = require("../models/Product");
const {
  getFromCache,
  setToCache,
  deleteByPattern,
  deleteFromCache,
} = require("../ulits/redisCache");

// Helper function for invalidating product caches
const invalidateProductCache = async (productId = null) => {
  try {
    await deleteByPattern("products:*");

    if (productId) {
      await deleteFromCache(`product:${productId}`);
    }

    console.log(
      `Product cache invalidated ${
        productId ? "for product " + productId : "globally"
      }`
    );
  } catch (error) {
    console.error("Error invalidating product cache:", error);
  }
};

const createProduct = async (req, res) => {
  try {
    if (Object.keys(req.body)?.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Input required!",
      });
    }
    const newProducts = await Product.create({
      user: req.userId,
      slug: slugify(req.body.title),
      ...req.body,
    });
    if (newProducts) {
      const user = await User.findById(req.userId);
      user.totalProduct++;
      await user.save();

      // Invalidate product cache after creating new product
      await invalidateProductCache();
    }
    return res.status(201).json({
      success: newProducts ? true : false,
      message: newProducts ? "Create success!" : "Cannot create new product",
      data: newProducts ? newProducts : null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    // Invalidate product cache after updating
    if (response) {
      await invalidateProductCache(pid);
    }

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Update success!" : "Cannot update product",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const userId = product?.user?.toString();
    const removeProduct = await Product.findByIdAndDelete(pid);
    if (userId) {
      await User.findByIdAndUpdate(userId, { $inc: { totalProduct: -1 } });
    }

    // Invalidate product cache after deletion
    if (removeProduct) {
      await invalidateProductCache(pid);
    }

    return res.status(200).json({
      success: removeProduct ? true : false,
      message: removeProduct ? "Delete success!" : "Cannot delete product",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const detailProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    // Try to get from cache first
    const cacheKey = `product:${pid}`;
    const cachedProduct = await getFromCache(cacheKey);
    if (cachedProduct) {
      return res.status(200).json(cachedProduct);
    }

    // If not in cache, get from database and cache it
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increase view count
    product.views = (product.views || 0) + 1;
    await product.save();

    const response = {
      success: true,
      product: product,
    };

    // Cache for 15 minutes
    await setToCache(cacheKey, response, 900);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Tạo key cho cache dựa trên query parameters
    const cacheKey = `products:${JSON.stringify(req.query)}`;

    const cachedData = await getFromCache(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Xử lý query parameters - Tối ưu hóa xử lý
    const {
      limit = 10,
      page = 0,
      sort,
      title,
      category_code,
      ...filters
    } = req.query;

    // Tạo query condition
    let queryConditions = {};

    // Xử lý các bộ lọc cụ thể
    if (title) {
      queryConditions.title = { $regex: title, $options: "i" };
    }

    if (category_code) {
      queryConditions.category_code = category_code;
    }

    // Xử lý các bộ lọc phạm vi (gt, gte, lt, lte)
    Object.keys(filters).forEach((key) => {
      if (typeof filters[key] === "object" && filters[key] !== null) {
        const rangeOperators = ["gte", "gt", "lte", "lt"];
        queryConditions[key] = {};

        rangeOperators.forEach((op) => {
          if (filters[key][op]) {
            queryConditions[key][`$${op}`] = Number(filters[key][op]);
          }
        });
      } else {
        queryConditions[key] = filters[key];
      }
    });

    const numLimit = Number(limit);
    const numPage = Number(page);
    const skip = numPage * numLimit;

    // Xử lý sắp xếp
    let sortBy = { createdAt: -1 };
    if (sort) {
      sortBy = {};
      sort
        .toString()
        .split(",")
        .forEach((field) => {
          const sortOrder = field.startsWith("-") ? -1 : 1;
          const fieldName = field.startsWith("-") ? field.substring(1) : field;
          sortBy[fieldName] = sortOrder;
        });
    }

    const totalProducts = await Product.countDocuments(queryConditions).lean();

    const products = await Product.find(queryConditions)
      .select("_id image_url title slug star sold old_price new_price discount")
      .sort(sortBy)
      .skip(skip)
      .limit(numLimit)
      .lean();

    // Tạo kết quả
    if (totalProducts === 0) {
      const response = {
        success: false,
        totalPage: 0,
        currentPage: 0,
        total_products: 0,
        products: null,
      };

      // Cache kết quả trống trong thời gian ngắn hơn (5 phút)
      await setToCache(cacheKey, response, 300);
      return res.status(200).json(response);
    }

    const response = {
      success: true,
      totalPage: Math.ceil(totalProducts / numLimit) - 1,
      currentPage: numPage,
      total_products: totalProducts,
      products: products,
    };

    // Lưu vào cache với TTL 15 phút
    await setToCache(cacheKey, response, 900);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProductsUser = async (req, res) => {
  try {
    const queries = { ...req.query };
    const excludeFields = ["limit", "sort", "page"];
    excludeFields?.forEach((field) => delete queries[field]);
    let queriesString = JSON.stringify(queries).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (el) => `$${el}`
    );
    let newQueryString = JSON.parse(queriesString);
    if (req.userId) {
      newQueryString.user = req.userId;
    }
    if (req.query.title) {
      newQueryString.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.createdAt) {
      const searchDate = new Date(req.query.createdAt);
      newQueryString.createdAt = {
        $gte: searchDate,
        $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (req.query.category_code) {
      newQueryString.category_code = req.query.category_code;
    }
    let products = Product.find(newQueryString).select(
      "-views -userId -userBought  -infoProduct"
    );
    if (req.query.sort) {
      const sortBy = req.query.sort.toString().replace(",", " ");
      products = products.sort(sortBy);
    } else {
      products = products.sort("-createdAt");
    }
    const totalProducts = await Product.countDocuments(newQueryString);
    if (totalProducts?.length === 0) {
      return res.status(201).json({
        success: false,
        totalPage: 0,
        currentPage: 0,
        total_products: 0,
        products: null,
      });
    }
    const limit = req.query.limit;
    const page = req.query.page * 1 || 0;
    const skip = page * limit;
    products = products.limit(limit).skip(skip);
    const newProducts = await products;
    return res.status(201).json({
      success: newProducts ? true : false,
      totalPage: limit ? Math.ceil(totalProducts / limit) - 1 : 0,
      currentPage: page,
      total_products: totalProducts,
      products: newProducts ? newProducts : null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get product all ready following
const getAllProductFollowing = async (req, res) => {
  try {
    // Sử dụng projection để chỉ lấy ra những trường cần thiết
    const currentUser = await User.findById(req.userId).select(
      "-verificationEmailToken -passwordTokenExpires -updatedAt -password -cart"
    );

    // Sử dụng Promise.all để thực hiện truy vấn song song và sử dụng populate để nạp các tài khoản user liên quan
    const allProduct = await Product.find({
      user: { $in: currentUser.followings },
    }).select(
      "_id image_url title slug star sold old_price new_price discount"
    );
    res.status(200).json({
      success: allProduct ? true : false,
      message: allProduct ? "Success" : "Failed",
      products: allProduct ? allProduct.flat() : null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// update  product ratings

const updateRatingsProduct = async (req, res) => {
  try {
    if (!req.body.rating && !req.params.pid)
      res.status(401).json({
        success: false,
      });
    const response = await Product.findByIdAndUpdate(req.params.pid, {
      star: Number(req.body.rating),
    });
    res.status(201).json({
      success: response ? true : false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBrand = async (req, res) => {
  try {
    const brand = await Product.distinct("brand", req.query);
    res.status(201).json({
      success: brand ? true : false,
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// insert products data
// const Bo_qua_tang = require("../../dataInsert/Bo-qua-tang.json")
// const Cham_soc_thu_cung = require("../../dataInsert/Cham-soc-thu-cung.json")
// const DJo_An_Vat = require("../../dataInsert/DJo-An-Vat.json")
// const DJau_andamp_Hat_Cac_Loai = require("../../dataInsert/DJau-andamp-Hat-Cac-Loai.json")
// const DJo_Uong_Khong_Con = require("../../dataInsert/DJo-Uong-Khong-Con.json")
// const DJo_uong_Pha_che_dang_bot = require("../../dataInsert/DJo-uong-Pha-che-dang-bot.json")
// const DJo_uong_co_con = require("../../dataInsert/DJo-uong-co-con.json")
// const Gia_Vi_va_Che_Bien = require("../../dataInsert/Gia-Vi-va-Che-Bien.json")
// const Sua_va_cac_San_pham_tu_sua = require("../../dataInsert/Sua-va-cac-San-pham-tu-sua.json")
// const Thuc_pham_DJong_hop_va_Kho = require("../../dataInsert/Thuc-pham-DJong-hop-va-Kho.json")
// const data = [Bo_qua_tang,
//     Cham_soc_thu_cung, DJo_An_Vat,
//     DJo_Uong_Khong_Con, DJo_uong_Pha_che_dang_bot,
//     DJo_uong_co_con, Gia_Vi_va_Che_Bien,
//     Sua_va_cac_San_pham_tu_sua, Thuc_pham_DJong_hop_va_Kho,
//     DJau_andamp_Hat_Cac_Loai
// ]
// const convertArrToObject = require("../ulits/convertArrToObject")
// const { categories } = require("../ulits/const")
// const autoCode = require("../ulits/autoCode")
// const user = ["6450d1fb1d1397a25959dc17", "64611f6f10487bbfc0707e82", "64611f4510487bbfc0707e7b"]

// const insertProductsData = async (req, res) => {
//     try {
//         const star = [3.5, 4, 4.5, 5]
//         let indexStar = 0
//         const response = await Promise.all(data.map(async (p, i) => {
//             const category_code = await autoCode(categories[i].category)
//             const category_name = categories[i].category
//             return p.map(async (item, i) => {
//                 indexStar = Math.floor(Math.random() * 3)
//                 await User.findByIdAndUpdate(user[i % 3], { $inc: { totalProduct: +1 } })
//                 const images = item?.images && item?.images.map(i => i.split(",")[0]
//                     .replace("100x100", "750x750")).filter((e, i) => !e.includes('w100') && !e.includes("upload") && !e.includes("w1080"))
//                 return await Product({
//                     image_url: item.image?.split(",")[0],
//                     images: Array.from(images).filter((e, i) => i != 0),
//                     title: item.title,
//                     brand: item.brand,
//                     brand_slug: slugify(item.brand),
//                     slug: slugify(item.title),
//                     star: star[indexStar], views: 10,
//                     sold: item.solid ? item.solid?.replace(".", "") : 0,
//                     old_price: item.oldPrice ? item.oldPrice?.replace(".", "") : 150000,
//                     new_price: item.newPrice ? item.newPrice?.replace(".", "") : 200000,
//                     in_stock: 1000,
//                     discount: item.discount ? item.discount : 15,
//                     category_code,
//                     category_name,
//                     infoProduct: convertArrToObject(item.detail),
//                     user: user[i % 3],
//                     description: item.description.join(", ")
//                 }).save()
//             })
//         }))
//         res.json(response ? response : false)

//     } catch (error) {
//         res.json({
//             err: error.message
//         })
//     }
// }

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  detailProduct,
  getAllProducts,
  getAllProductFollowing,
  updateRatingsProduct,
  getAllBrand,
  // insertProductsData,
  getAllProductsUser,
};
