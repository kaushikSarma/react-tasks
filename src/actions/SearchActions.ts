import * as Redux from 'react-redux';

export const readCache = () => ({
    type: "READ_SEARCH_FILTERS"
}); 

export const updateFilters = (data) => ({
    type: "UPDATE_SEARCH_FILTERS",
    filterdata: data
});

export const updateCatalog = (data) => ({
    type: "UPDATE_CATALOG",
    data: data
})