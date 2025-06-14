import { BOTTOM_NAVIGATE_MOBILE, useAppTranslation } from '../../utils/const';
import { Link, NavLink } from 'react-router-dom';

export const BottomNavigate = () => {
    const { t } = useAppTranslation();

    return (
        <div className="fixed w-full  bottom-0 right-0 grid grid-cols-5 z-[999] bg-white shadow-search laptop:hidden">
            {BOTTOM_NAVIGATE_MOBILE.map((e, index) => {
                return (
                    <NavLink
                        key={index}
                        to={e.link}
                        className={(nav) =>
                            (nav.isActive ? 'bg-[rgb(229,231,235)]' : '') +
                            ' py-2 flex flex-col items-center justify-center'
                        }
                    >
                        <img src={e.logo} className="w-[30%] h-auto" />
                        <p className="text-sm">{t(e.label_key)}</p>
                    </NavLink>
                );
            })}
        </div>
    );
};
