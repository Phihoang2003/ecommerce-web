import { httpRequest } from '../utils/httpRequest';

const getAllProduct = async (params:object) => {
    try {
        const res = await httpRequest.get('product/all',{
            params
        });
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

export { getAllProduct };
