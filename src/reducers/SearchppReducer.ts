import { CONST_STORAGE } from "@data/Constants";

class SearchAppState {
    filtersList: {BRAND:{} , COLOR: {}, PRICE:{}} = {
        BRAND: {} , COLOR:{}, PRICE:{}
    };
        
    constructor({brand, color, price}: {brand: {}, color: {}, price:{}}) {
        this.filtersList.BRAND = brand;
        this.filtersList.COLOR = color;
        this.filtersList.PRICE = price;
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
    brand: {}, color: {}, price: {}
}), action) => {
    switch(action.type) {
        case 'READ_SEARCH_FILTERS': {
            let filters = JSON.parse(window.localStorage.getItem(CONST_STORAGE.SEARCH_STORAGE));
            console.log('Reading filters from localstorage: ', filters);
            if (filters !== null) {
                const newstate = new SearchAppState({brand: filters.filtersList.BRAND, color: filters.filtersList.COLOR, price: filters.filtersList.PRICE});
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
            });
            updateCache(newstate);
            return newstate;
        }
    }
    return state;
}


