import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`px-2 py-1 rounded ${i18n.language === 'vi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('vi')}
            >
                VI
            </button>
            <span className="ml-2 text-sm">{t('common.changeLanguage')}</span>
        </div>
    );
};

export default LanguageSwitcher;
