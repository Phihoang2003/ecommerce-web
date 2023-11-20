import { createSlice } from '@reduxjs/toolkit';
import { ProductByShop, ProductInCart } from '../../../interfaces/interfaces';

interface CartInterface {
    orderInfo:any;
    selectedProducts: Array<ProductInCart>;
    productInCart: Array<ProductInCart>;
    productsByShopId: Array<ProductByShop>;
}

const initialState: CartInterface = {
    selectedProducts: JSON.parse(localStorage.getItem('selectedProducts') || '[]'),
    productInCart: JSON.parse(localStorage.getItem('productInCart') || '[]'),
    productsByShopId: [],
    orderInfo:null
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setAddProductInCartFromApi: (state, action) => {
            if (action.payload?.length >= 0) {
                state.productInCart = action.payload;
            }
            localStorage.setItem('productInCart', JSON.stringify(state.productInCart));
        },
        setAddProductInCart: (state, action) => {
            const payloadProductId = action.payload?._id;
            const existingProductIndex = state.productInCart.findIndex((product) => product._id === payloadProductId);
            if (existingProductIndex !== -1) {
                state.productInCart[existingProductIndex] = { ...action.payload };
            } else {
                state.productInCart.push(action.payload);
            }
            localStorage.setItem('productInCart', JSON.stringify(state.productInCart));
        },

        setSelectedProducts: (state, action) => {
            const { _id } = action.payload;
            if (state.selectedProducts.some((i) => i._id === _id)) {
                state.selectedProducts = state.selectedProducts.filter((i) => i._id !== _id);
            } else {
                state.selectedProducts.push(action.payload);
            }
        },
        setSelectedProductsAll: (state, action) => {
            if (state.selectedProducts?.length === action.payload?.length) {
                state.selectedProducts = [];
            } else {
                state.selectedProducts = action.payload;
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        setSelectedProductsEmpty: (state) => {
            state.selectedProducts = [];
            state.productsByShopId = [];
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        setIncreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                productInCart.quantity += 1;
                productInCart.totalPrice += productInCart.productId.new_price;
            }
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            if (selectedProducts) {
                selectedProducts.quantity += 1;
                selectedProducts.totalPrice += selectedProducts.productId.new_price;
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            localStorage.setItem('productInCart', JSON.stringify(state.productInCart));
        },
        setDecreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                if (productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                    productInCart.totalPrice -= productInCart.productId.new_price;
                } else {
                    productInCart.quantity = 1;
                    productInCart.totalPrice = productInCart.productId.new_price;
                }
            }
            if (selectedProducts) {
                if (selectedProducts.quantity > 1) {
                    selectedProducts.quantity -= 1;
                    selectedProducts.totalPrice -= selectedProducts.productId.new_price;
                } else {
                    selectedProducts.quantity = 1;
                    selectedProducts.totalPrice = selectedProducts.productId.new_price;
                }
            }
        },
        setRemoveProductInCart: (state, action) => {
            const { _id } = action.payload;
            state.selectedProducts = state.selectedProducts?.filter((item) => item?._id !== _id);
            state.productInCart = state.productInCart?.filter((item) => item?._id !== _id);
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            localStorage.setItem('productInCart', JSON.stringify(state.productInCart));
        },
        //phân chia đơn hàng theo shop
        setProductsByShopId: (state) => {
           
            state.selectedProducts.forEach((e) => {
                const shop = state.productsByShopId.find((s) => s?.shopId == e?.shopId);
                if (shop) {
                    const indexProduct = shop?.products.find((p) => p._id === e.productId._id);
                    if (!indexProduct) {
                        shop.products.push({
                            ...e.productId,
                            quantity: e.quantity,
                            totalPrice: e.totalPrice,
                        });
                    } else {
                        indexProduct.quantity = e.quantity;
                    }
                } else {
                    state.productsByShopId.push({
                        _id: e._id,
                        products: [
                            {
                                ...e.productId,
                                quantity: e.quantity,
                                totalPrice: e.totalPrice,
                            },
                        ],
                        deliverDate: Date.now() + 60 * 60 * (Math.random() * 10 + 3) * 24 * 1000,
                        shopId: e?.shopId,
                        user: e.user,
                    });
                }
            });
        },
        setOrderInfo:(state,action)=>{
            state.orderInfo=action.payload
        }
    },
});

export const {
    setSelectedProducts,
    setAddProductInCartFromApi,
    setAddProductInCart,
    setSelectedProductsAll,
    setIncreaseProduct,
    setDecreaseProduct,
    setRemoveProductInCart,
    setProductsByShopId,
    setSelectedProductsEmpty,
    setOrderInfo
} = orderSlice.actions;

export default orderSlice.reducer;
