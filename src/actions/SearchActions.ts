export const readCache = (CacheState) => ({
    type: "READ_SEARCH_CACHE",
    filterBrand: CacheState.filtersList.BRAND,
    filterColor: CacheState.filtersList.COLOR,
    filterPrice: CacheState.filtersList.PRICE,
    products: CacheState.products === undefined ? [] : CacheState.products
});

export const updateFilters = (data) => ({
    type: "UPDATE_SEARCH_FILTERS",
    filterdata: data
});

export const updateCatalog = (data) => ({
    type: "UPDATE_SEARCH_CATALOG",
    products: data.products
})