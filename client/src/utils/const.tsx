import { useTranslation } from 'react-i18next';

// Create a function to get translations
export const useAppTranslation = () => {
    return useTranslation();
};

export const path = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    DETAILPRODUCT: '/:slug/:pid',
    PAGE_CATEGORY: '/danh-muc/:category_slug/:cid',
    PAGE_LIST_CATEGORY: 'danh-sach-danh-muc',
    PAGE_BRAND: '/thuong-hieu/:brand_slug',
    PAGE_SEARCH: '/tim-kiem/:title',
    PAGE_SHOP: '/cua-hang/:name_shop/:sid',
    PAGE_USER: '/user/account',
    PAGE_CART: '/cart',
    PAGE_PAYMENT: '/payment',
    PAGE_PAYPAL: '/payment/paypal',
    FORGET_PASSWORD: '/reset_password/:token',
    FOLLOWING: 'follow',
    MESSAGE: 'message',
};

export const SEARCH_UTILITY = [
    {
        id: 1,
        image: danhchoban,
        title_key: 'search.forYou',
    },
    {
        id: 2,
        image: bachhoa,
        title_key: 'search.groceryUnder99k',
    },
    {
        id: 3,
        image: dealsieuhot,
        title_key: 'search.superHot',
    },
    {
        id: 4,
        image: hangmoi,
        title_key: 'search.newItems',
    },
    {
        id: 5,
        image: revodoi,
        title_key: 'search.superCheap',
    },
];

export const RATING_REVIEW = [
    { start: 1, text_key: 'rating.veryBad' },
    { start: 2, text_key: 'rating.bad' },
    { start: 3, text_key: 'rating.normal' },
    { start: 4, text_key: 'rating.good' },
    { start: 5, text_key: 'rating.veryGood' },
];

export const SORT_BAR = [
    {
        id: 0,
        label_key: 'sort.all',
        sortBy: {
            sort: '',
        },
    },
    {
        id: 1,
        label_key: 'sort.popular',
        sortBy: {
            sort: '-star',
        },
    },
    {
        id: 2,
        label_key: 'sort.bestSelling',
        sortBy: {
            sort: '-sold',
        },
    },
    {
        id: 3,
        label_key: 'sort.priceLowToHigh',
        sortBy: {
            sort: 'new_price',
        },
    },
    {
        id: 4,
        label_key: 'sort.priceHighToLow',
        sortBy: {
            sort: '-new_price',
        },
    },
];

import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellIcon from '@mui/icons-material/Sell';
import { bachhoa, danhchoban, dealsieuhot, hangmoi, imgPayInCash, paypal, revodoi } from '../assets';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const SIDEBAR_USER = [
    {
        label_key: 'user.accountInfo',
        path_name: 'profile',
        icon: <PersonIcon fontSize="medium" style={{ color: 'rgb(155,155,155)' }} />,
    },
    {
        label_key: 'user.purchaseOrders',
        path_name: 'purchase',
        icon: <ShoppingBasketIcon fontSize="medium" style={{ color: 'rgb(155,155,155)' }} />,
    },
    {
        label_key: 'user.sellManagement',
        path_name: 'sell',
        icon: <SellIcon fontSize="medium" style={{ color: 'rgb(155,155,155)' }} />,
    },
    {
        label_key: 'user.productManagement',
        path_name: 'product',
        icon: <ProductionQuantityLimitsIcon fontSize="medium" style={{ color: 'rgb(155,155,155)' }} />,
    },
];

export const PAYMENT_METHOD = {
    title_key: 'payment.selectPaymentMethod',
    method: [
        {
            code: 'CASH',
            label_key: 'payment.cashOnDelivery',
            img: imgPayInCash,
        },
        {
            code: 'PAYPAL',
            label_key: 'payment.paypal',
            img: paypal,
        },
    ],
};
export const DELIVERY_METHOD = {
    title_key: 'delivery.selectDeliveryMethod',
    method: [
        {
            code: 'FAST',
            label_key: 'delivery.economyDelivery',
        },
        {
            code: 'NOW',
            label_key: 'delivery.fastDelivery',
        },
    ],
};

export const SELL_TAB = [
    {
        tab: 1,
        title_key: 'order.all',
    },
    {
        tab: 2,
        title_key: 'order.pending',
    },
    {
        tab: 3,
        title_key: 'order.shipping',
    },
    {
        tab: 4,
        title_key: 'order.delivered',
    },
    {
        tab: 5,
        title_key: 'order.completed',
    },
    {
        tab: 6,
        title_key: 'order.cancelled',
    },
];

export const BOTTOM_NAVIGATE_MOBILE = [
    {
        label_key: 'common.home',
        logo: 'https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/home.png',
        link: path.HOME,
    },
    {
        label_key: 'common.category',
        logo: 'https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/cate.png',
        link: path.PAGE_LIST_CATEGORY,
    },
    {
        label_key: 'common.follow',
        logo: 'https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/account.png',
        link: '/follow',
    },
    {
        label_key: 'common.chat',
        logo: 'https://salt.tikicdn.com/ts/upload/b6/cb/1d/34cbe52e6c2566c5033103c847a9d855.png',
        link: '/message',
    },
    {
        label_key: 'common.personal',
        logo: 'https://frontend.tikicdn.com/_mobile-next/static/img/home/navigation/account.png',
        link: path.PAGE_USER,
    },
];
