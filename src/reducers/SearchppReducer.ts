import { CONST_STORAGE } from "@data/Constants";
import { Product } from "@data/Product";

class SearchAppState {
    filtersList: {BRAND:{} , COLOR: {}, PRICE:{}} = {
        BRAND: {} , COLOR:{}, PRICE:{}
    };

    products: Product[];
    productLoaded: false;

    constructor({brand, color, price, products}: {brand: {}, color: {}, price:{}, products?: Product[]}) {
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
        case 'READ_SEARCH_FILTERS': {
            let filters = JSON.parse(window.localStorage.getItem(CONST_STORAGE.SEARCH_STORAGE));
            console.log('Reading filters from localstorage: ', filters);
            if (filters !== null) {
                const newstate = new SearchAppState({brand: filters.filtersList.BRAND, color: filters.filtersList.COLOR, price: filters.filtersList.PRICE, products: state.products});
                return newstate
            }
            return state;
        }
        case "UPDATE_SEARCH_FILTERS": {
            console.log(action.filterdata);
            const newstate = new SearchAppState({
                brand: action.filterdata.filters.filter(d => d.type === 'BRAND')[0],
                color: action.filterdata.filters.filter(d => d.type === 'COLOUR')[0],
                price: action.filterdata.filters.filter(d => d.type === 'PRICE')[0],
                products: state.products
            });
            updateCache({ filtersList: newstate.filtersList });
            return newstate;
        }
        case "UPDATE_CATALOG": {
            console.log('Updating catalog', action.data);
            const combinedproductarray = action.data.map(p => {
                const q = state.products.find(q => q.id === p.id);
                if ( q !== null && q !== undefined)
                    p.qty = q.qty;
                return p;
            });
            const newstate = new SearchAppState({
                brand: state.filtersList.BRAND,
                price: state.filtersList.PRICE,
                color: state.filtersList.COLOR,
                products: combinedproductarray
            });
            return newstate;
        }
        case "INCREASE_QTY": {
            console.log('Increasing qty', action.id);
            const newproducts = state.products.map(p => {
                if(p.id === action.id) p.qty = (p.qty === undefined || p.qty === 0) ? 1 : p.qty + 1
                return p;
            })
            const newstate = new SearchAppState({
                brand: state.filtersList.BRAND,
                price: state.filtersList.PRICE,
                color: state.filtersList.COLOR,
                products: newproducts
            });
            return newstate;
        }
        case "DECREASE_QTY": {
            console.log('Decreasing qty', action.id);
            const newproducts = state.products.map(p => {
                if(p.id === action.id) p.qty = (p.qty === undefined || p.qty === 0) ? 0 : p.qty - 1
                    return p;
            });
            const newstate = new SearchAppState({
                brand: state.filtersList.BRAND,
                price: state.filtersList.PRICE,
                color: state.filtersList.COLOR,
                products: newproducts
            });
            return newstate;
        }
        case "EMPTY_BASKET": {
            const newsstate = new SearchAppState ({
                brand: state.filtersList.BRAND,
                price: state.filtersList.PRICE,
                color: state.filtersList.COLOR,
                products: state.products.map(p => {
                    delete p.qty;
                    return p;
                })
            });
            return newsstate;
        }
    }
    return state;
}


