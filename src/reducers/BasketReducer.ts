class BasketState {
    offer: {
        min_total: number,
        offer_title: string,
        offer_detail: string,
        basket_difference: number,
    }
    constructor(  offer: {min_total: number,  offer_title: string, offer_detail: string, basket_difference: number} ) {
        this.offer = offer;   
    }
}

export const BasketReducer = (state: BasketState = new BasketState({
    min_total: 0, offer_title: "", offer_detail: "", basket_difference: 0
}), action) => {
    switch(action.type) {
        case 'UPDATE_BASKET': {
            const newstate = new BasketState({
                min_total: action.offer.min_total,
                offer_title: action.offer.offer_title,
                offer_detail: action.offer.offer_detail,
                basket_difference: action.offer.basket_difference
            });
            console.log('basket reduced', newstate);
            return newstate;
        }
        default: return state;
    }
}