import SortDataOptions from "@/shared/enum/SortDataOptions";
import {ref} from 'vue';
export const useProductManage = () => {
    const sortDataOptions = [{
        key: SortDataOptions.AZAsc,
        value: 'Name Product A to Z',
        field: 'productName',
        sortType: 'asc'
    }, {
        key: SortDataOptions.AZDesc,
        value: 'Name Product Z to A',
        field: 'productName',
        sortType: 'desc'
    }, {
        key: SortDataOptions.PriceAsc,
        value: 'Price Low to High',
        field: 'productPrice',
        sortType: 'asc'
    }, {
        key: SortDataOptions.PriceDesc,
        value: 'Price High to Low',
        field: 'productPrice',
        sortType: 'desc'
    }, {
        key: SortDataOptions.None,
        value: 'None',
    }];

    const handleSortDataOption = (optionKey) => {
        if (!optionKey) return null;
        const optionChosen = sortDataOptions.find(option => option.key === optionKey);
        if (optionChosen) {
            return {
                sortBy: optionChosen.field,
                sortType: optionChosen.sortType
            };
        }
    }

    const defaultFilterOptions = {
        // page: 1,
        // size: 25,
        fields: ['productId', 'productName', 'productPrice', 'productRate', 'productImageLink'],
        sortBy: [],
        sortType: [],
        filter: [],
        page: 1,
        size: 8
    };

    return {
        sortDataOptions,
        handleSortDataOption,
        defaultFilterOptions
    }
}