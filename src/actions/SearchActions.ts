export enum SearchPageActions {
    READ_FILTERS = "READ_SEARCH_FITLERS",
    UPDATE_RESULTS = "UPDATE_SEARCH_FILTERS",
    UPDATE_CATALOG = "UPDATE_CATALOG",
}

export const readCache = () => ({
    type: SearchPageActions.READ_FILTERS
}); 

export const updateFilters = (data) => ({
    type: SearchPageActions.UPDATE_RESULTS,
    filterdata: data
});

export const updateCatalog = (data) => ({
    type: SearchPageActions.UPDATE_CATALOG,
    data: data
})