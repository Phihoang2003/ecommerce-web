import React, { useState } from 'react';
import { apiUploadImage } from '../../../../services/apiUploadPicture';
import { showNotification } from '../../../../component';
import ReactLoading from 'react-loading';
import { noUser } from '../../../../assets';
import { UserProfile } from '../../../../interfaces/interfaces';
import { useTranslation } from 'react-i18next';
interface AvatarProps {
    setPayload: React.Dispatch<React.SetStateAction<UserProfile>>;
    payload: UserProfile;
}
const Avatar: React.FC<AvatarProps> = ({ setPayload, payload }) => {
    const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
    const { t } = useTranslation();
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setIsLoadingImg(true);
        if (!files) return;
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
        try {
            const response = await apiUploadImage(formData);
            setPayload((e: any) => ({ ...e, avatar_url: response.url }));
        } catch (error) {
            showNotification('Lỗi xảy ra khi tải lên ảnh:', false);
        }
        setIsLoadingImg(false);
    };

    return (
        <div className="flex flex-col w-full items-center gap-4 ">
            <div className="w-48 h-48 rounded-full overflow-hidden mx-auto  border-[1px] border-solid border-separate">
                {isLoadingImg ? (
                    <div className="w-full flex justify-center h-full items-center">
                        <ReactLoading type="cylon" color="rgb(0, 136, 72)" />
                    </div>
                ) : (
                    <img className="w-full h-full object-cover block" src={payload.avatar_url || noUser} />
                )}
            </div>
            <label className=" border-[1px] border-solid border-separate py-2 px-4">
                {t('user.selectImage')}
                <input type="file" readOnly hidden onChange={handleImageUpload} className="none" />
            </label>
        </div>
    );
};

export default Avatar;
