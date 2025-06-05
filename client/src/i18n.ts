import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enTranslation from './locales/en/translation.json';
// Vietnamese translations
import viTranslation from './locales/vi/translation.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    vi: {
        translation: viTranslation,
    },
};

i18n
    // Sử dụng i18next-http-backend để tải các file dịch
    .use(Backend)
    // Tự động phát hiện ngôn ngữ người dùng
    .use(LanguageDetector)
    // Kết nối với React
    .use(initReactI18next)
    // Khởi tạo i18next
    .init({
        resources,
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, // React đã xử lý XSS
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
