import React from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { ListCategory, SearchByBrand, SearchByPrice, SearchByRating } from '../../../../component';
import { useTranslation } from 'react-i18next';

const FilterPanel: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="tablet:hidden w-2/12 pr-2 bg-white mt-1">
            <div className="w-full h-full  py-2 pl-4 ">
                <div className="flex items-center gap-1">
                    <FilterAltOutlinedIcon fontSize="small" />
                    <h1 className="uppercase font-medium text-base"> {t('search.filterSearch')}</h1>
                </div>
                <ListCategory />
                <SearchByRating />
                <SearchByPrice />
                <SearchByBrand />
            </div>
        </div>
    );
};

export default FilterPanel;
