import { CONST_STORAGE } from "@data/Constants";
import { Product } from '@data/Product';

class SearchAppState {
    filtersList: {BRAND:{} , COLOR: {}, PRICE:{}} = {
        BRAND: {} , COLOR:{}, PRICE:{}
    };
    products: Product[] = [];

        
    constructor({brand, color, price, products = []}: {brand: {}, color: {}, price:{}, products?: Product[]}) {
        this.filtersList.BRAND = brand;
        this.filtersList.COLOR = color;
        this.filtersList.PRICE = price;
        this.products = products;
    }
}

const updateCache = (data) => {
    let SearchCacheString = JSON.stringify(data);
    window.localStorage.setItem(
      CONST_STORAGE.SEARCH_STORAGE,
      SearchCacheString
    );
};

export const SearchAppReducer = (state: SearchAppState = new SearchAppState({
    brand: {}, color: {}, price: {}, products: []
}), action) => {
    switch(action.type) {
        case 'READ_SEARCH_CACHE': {
            console.log('Getting from storage: ', action);
            const newstate = new SearchAppState({brand: action.filterBrand, color: action.filterColor, price: action.filterPrice, products: action.products});
            return newstate;
        }
        case "UPDATE_SEARCH_FILTERS": {
            console.log(action.filterdata);
            const newstate = new SearchAppState({
                brand: action.filterdata.filters.filter(d => d.type === 'BRAND')[0],
                color: action.filterdata.filters.filter(d => d.type === 'COLOUR')[0],
                price: action.filterdata.filters.filter(d => d.type === 'PRICE')[0],
                products: state.products
            });
            updateCache(newstate);
            return newstate;
        }
        case "UPDATE_SEARCH_CATALOG": {
            console.log(action.products);
            const newstate = new SearchAppState({
                brand: state.filtersList.BRAND,
                color: state.filtersList.COLOR,
                price: state.filtersList.PRICE,
                products: action.products
            });
            updateCache(newstate);
            return newstate;
        }
    }
    return state;
}


