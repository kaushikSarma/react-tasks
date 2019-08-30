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

export const SearchAppReducer = (state: number = 0, action) => state


