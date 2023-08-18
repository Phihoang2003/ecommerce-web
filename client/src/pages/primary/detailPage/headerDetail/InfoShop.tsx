import React, { useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';
import { noUser } from '../../../../assets';
import { useAppSelector } from '../../../../redux/hooks';
import { apiFollowingUser, apiUnFollowingUser } from '../../../../services/apiUser';
import {
    setIsOpenChat,
    setLoadDataConversation,
    setOpenFeatureAuth,
} from '../../../../redux/features/action/actionSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonOutline, showNotification } from '../../../../component';
import { formatUserName } from '../../../../utils/formatUserName';
import { createConversation } from '../../../../services/apiConversation';

interface InfoShop {
    _id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    followers: string[];
    avatar_url: string;
    email: string;
}
const InfoShop: React.FC<{ shop: InfoShop }> = ({ shop }) => {
    const dispatch = useDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { isLoginSuccess, userOnline } = useAppSelector((state) => state.auth);
    const { mobile_ui } = useAppSelector((state) => state.action);
    const [currentFollowers, setCurrentFollowers] = useState<Array<string>>(shop?.followers);
    const navigate = useNavigate();
    const handelFollowing = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (shop?._id === currentUser._id) {
            showNotification('Không thể theo dõi chính bạn!', false);
            return;
        }
        if (currentFollowers.includes(currentUser._id)) {
            setCurrentFollowers((user) => user.filter((i) => i !== currentUser._id));
            await apiUnFollowingUser(shop?._id);
        } else {
            setCurrentFollowers((user) => [...user, currentUser._id]);
            await apiFollowingUser(shop?._id);
        }
    };

    const handleCLickChat = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (shop?._id === currentUser._id) {
            showNotification('Không thể chat!', false);
            return;
        }
        await createConversation(shop._id);
        dispatch(setIsOpenChat(true));
        dispatch(setLoadDataConversation());
        if (mobile_ui) {
            navigate('/message');
        }
    };
    return (
        <div className="tablet:w-full w-[240px] h-auto border-[1px] border-solid py-3 border-slate-200 rounded-sm px-3">
            <div className="flex items-center w-full h-auto gap-2">
                <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                    <img
                        className="w-full h-full block object-cover"
                        src={shop?.avatar_url ? shop?.avatar_url : noUser}
                    />
                </div>
                <div>
                    {formatUserName(shop)}
                    {userOnline.some((user) => user.userId === shop._id) && (
                        <p className="text-xs text-primary">Đang hoạt động</p>
                    )}
                </div>
            </div>
            <div className="flex my-2 gap-2 text-sm items-center mt-4">
                Lượt theo dõi:
                <span className="text-base font-medium"> {currentFollowers?.length}</span>
            </div>
            <div className="flex gap-2">
                <ButtonOutline>
                    <Link
                        to={`/cua-hang/${formatUserName(shop)}/${shop?._id}`}
                        className="flex justify-center items-center gap-2"
                    >
                        <CardGiftcardIcon fontSize="small" />
                        Xem shop
                    </Link>
                </ButtonOutline>
                <ButtonOutline
                    onClick={handelFollowing}
                    className={`${
                        currentFollowers?.includes(currentUser?._id)
                            ? 'bg-bgSecondary border-none hover:bg-bgSecondary'
                            : ''
                    }`}
                >
                    {currentFollowers?.includes(currentUser?._id) ? (
                        <>Đã theo dõi</>
                    ) : (
                        <>
                            <AddIcon fontSize="small" />
                            Theo dõi
                        </>
                    )}
                </ButtonOutline>
            </div>
            <ButtonOutline
                className="w-full border-red_custom mt-4  justify-center text-red_custom"
                onClick={handleCLickChat}
            >
                <MessageIcon fontSize="small" />
                Chat ngay
            </ButtonOutline>
        </div>
    );
};

export default InfoShop;
