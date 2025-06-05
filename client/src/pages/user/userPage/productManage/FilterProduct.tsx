import React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { InputForm } from '../../../../component';
import { useTranslation } from 'react-i18next';

interface IFilterProduct {
    queries: {
        createdAt: string;
        title: string;
    };
    setQueries: React.Dispatch<
        React.SetStateAction<{
            createdAt: string;
            title: string;
        }>
    >;
}
const FilterProduct: React.FC<IFilterProduct> = ({ queries, setQueries }) => {
    const { t } = useTranslation();
    return (
        <div className="mobile:flex mobile:flex-col mobile:gap-2 grid grid-cols-2 w-full my-6 justify-between items-center ">
            <div className="flex w-full h-full gap-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label={t('product.productDate')}
                            value={queries.createdAt}
                            onChange={(e: any) =>
                                setQueries((prev) => ({ ...prev, createdAt: e.format('MM/DD/YYYY') }))
                            }
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <div
                    onClick={(e: any) => setQueries((prev) => ({ ...prev, createdAt: '' }))}
                    className="flex text-primary font-medium cursor-pointer items-center"
                >
                    {t('product.default')}
                </div>
            </div>
            <InputForm
                name_id="search"
                placeholder={t('product.productName')}
                value={queries.title}
                handleOnchange={(e) => setQueries((prev) => ({ ...prev, title: e.target.value }))}
            />
        </div>
    );
};

export default FilterProduct;
