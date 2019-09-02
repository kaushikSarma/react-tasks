class SearchAppState {
    filtersList: {BRAND:{} , COLOR: {}, PRICE:{}} = {
        BRAND: {} , COLOR:{}, PRICE:{}
    };
    productList: {
        sortBy: string,
        products: {
            "id": string,
            "colour"?: {
                "color": string,
                "title": string
            },
            "brand"?: string,
            "discount"?: number,
            "rating"?: number,
            "image"?: string,
            "price"?: {
                "mrp"?: number
                "final_price"?: number
            },
            "title"?: "Provogue Running Shoes For Men"
        }[]
    } = {
        sortBy: "REL", products: []
    }
    constructor({brand, color, price, sortBy = "REL", products = []}: {brand: {}, color: {}, price:{}, sortBy?: string, products?: {
        "id": string,
            "colour"?: {
                "color": string,
                "title": string
            },
            "brand"?: string,
            "discount"?: number,
            "rating"?: number,
            "image"?: string,
            "price"?: {
                "mrp"?: number
                "final_price"?: number
            },
            "title"?: "Provogue Running Shoes For Men"
    }[]}) {
        this.filtersList.BRAND = brand;
        this.filtersList.COLOR = color;
        this.filtersList.PRICE = price;
        this.productList.sortBy = sortBy;
        this.productList.products = products;
    }
}

export const SearchAppReducer = (state: SearchAppState = new SearchAppState({
    brand: {}, color: {}, price: {}, sortBy: "REL", products: []
}), action) => {
    switch(action.type) {
        case 'READ_SEARCH_CACHE': {
            console.log('Getting from storage: ', action);
            const newstate = new SearchAppState({brand: action.filterBrand, color: action.filterColor, price: action.filterPrice, sortBy: action.sortBy, products: action.products});
            return newstate;
        }
        case "UPDATE_SEARCH_FILTERS": {
            console.log(action.filterdata);
            const newstate = new SearchAppState({
                brand: action.filterdata.filters.filter(d => d.type === 'BRAND')[0],
                color: action.filterdata.filters.filter(d => d.type === 'COLOUR')[0],
                price: action.filterdata.filters.filter(d => d.type === 'PRICE')[0],
                sortBy: state.productList.sortBy,
                products: state.productList.products
            });
            return newstate;
        }
        case "UPDATE_SEARCH_LIST": {
            console.log(action.productList);
            const newstate = new SearchAppState({
                brand: state.filtersList.BRAND,
                color: state.filtersList.COLOR,
                price: state.filtersList.PRICE,
                sortBy: state.productList.sortBy,
                products: action.productList
            });
            return newstate;
        }
    }
    return state;
}


