import React from 'react';
import Notification from './Notification';
import FacebookIcon from '@mui/icons-material/Facebook';
import User from './User';
import Cart from '../../cart';
import { useAppSelector } from '../../../redux/hooks';
import LanguageSwitcher from '../../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const HeaderTop: React.FC = () => {
    const { t } = useTranslation();
    const { mobile_ui } = useAppSelector((state) => state.action);
    return (
        <div className="flex w-full justify-between items-center py-[6px] px-6  ">
            <div className="flex gap-6 ">
                <a
                    href="https://www.facebook.com/profile.php?id=100012882123870"
                    target="_blank"
                    className="flex gap-2 text-white"
                >
                    <span className="tablet:hidden text-sm ">{t('common.login')}</span>
                    <FacebookIcon fontSize="small" />
                </a>
            </div>
            <div className="flex items-center gap-6 ">
                <LanguageSwitcher />
                <Notification />
                {mobile_ui ? <Cart /> : <User />}
            </div>
        </div>
    );
};

export default HeaderTop;
