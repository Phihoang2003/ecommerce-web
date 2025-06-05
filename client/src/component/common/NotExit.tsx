import React from 'react';
import { notExit } from '../../assets';
import { useTranslation } from 'react-i18next';

const NotExit: React.FC<{ label?: string }> = ({ label }) => {
    const { t } = useTranslation();
    const defaultLabel = t('common.noMessages');

    return (
        <div className="flex flex-col items-center w-full h-full justify-center bg-white py-4">
            <img className="tablet:w-4/6 laptop:w-1/6 " src={notExit} alt="Not exist" />
            <h1 className="text-secondary">{label || defaultLabel}</h1>
        </div>
    );
};

export default NotExit;
