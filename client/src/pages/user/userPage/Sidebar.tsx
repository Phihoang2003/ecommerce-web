import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { noUser } from '../../../assets';
import { SIDEBAR_USER, path, useAppTranslation } from '../../../utils/const';
import { setOpenFeatureAuth } from '../../../redux/features/action/actionSlice';

export const Sidebar: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    useEffect(() => {
        if (location.pathname === path.PAGE_USER && !isLoginSuccess) {
            navigate('/');
            dispatch(setOpenFeatureAuth(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return (
        <div className="flex flex-col w-full gap-6 bg-white py-3 rounded-md overflow-hidden">
            <div className="flex gap-2 items-center ml-2">
                <div className="w-11 h-11 overflow-hidden rounded-full border-[1px] border-solid border-separate">
                    <img src={currentUser.avatar_url || noUser} className="w-full h-full object-cover block" />
                </div>
                <div className="flex flex-col text-xs text-secondary">
                    {t('user.account')}
                    <span className="text-base font-normal text-black ">
                        {currentUser?.firstName
                            ? `${currentUser?.lastName} ${currentUser?.firstName}`
                            : currentUser?.email?.split('@')[0]}
                    </span>
                </div>
            </div>

            <ul className="w-full h-full ">
                {SIDEBAR_USER.map((e, index) => (
                    <NavLink
                        key={index}
                        to={e.path_name}
                        className={`flex gap-4 p-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer ${
                            location.pathname?.includes(e.path_name) ? 'bg-gray-200' : ''
                        }`}
                    >
                        {e.icon}
                        {t(e.label_key)}
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};
