class SearchAppState {
    filtersList: {BRAND:{} , COLOR: {}, PRICE:{}} = {
        BRAND: {} , COLOR:{}, PRICE:{}
    };
    // productList: {
    //     products: []
    // }
    constructor({brand, color, price}: {brand: {}, color: {}, price:{}}) {
        this.filtersList.BRAND = brand;
        this.filtersList.COLOR = color;
        this.filtersList.PRICE = price;
    }
}

export const SearchAppReducer = (state: SearchAppState = new SearchAppState({
    brand: {}, color: {}, price: {}
}), action) => {
    switch(action.type) {
        case 'READ_SEARCH_CACHE': {
            console.log('Getting from storage: ', action);
            const newstate = new SearchAppState({brand: action.filterBrand, color: action.filterColor, price: action.filterPrice});
            return newstate;
        }
        case "UPDATE_SEARCH_FILTERS": {
            console.log(action.filterdata);
            const newstate = new SearchAppState({
                brand: action.filterdata.filters.filter(d => d.type === 'BRAND')[0],
                color: action.filterdata.filters.filter(d => d.type === 'COLOUR')[0],
                price: action.filterdata.filters.filter(d => d.type === 'PRICE')[0],
            })
            return newstate;
        }
    }
    return state;
}


