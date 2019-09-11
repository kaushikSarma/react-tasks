class BasketState {
    offer: {
        min_total: number,
        offer_title: string,
        offer_detail: string,
        basket_difference: number,
    }
    current_offer: {
        min_total: number,
        offer_title: string,
        offer_detail: string
    }
    constructor(  offer: {min_total: number,  offer_title: string, offer_detail: string, basket_difference: number},
                  current_offer?: {min_total: number,  offer_title: string, offer_detail: string} ) {
        this.offer = offer;   
        this.current_offer = current_offer;
    }
}

export const BasketReducer = (state: BasketState = new BasketState( 
    {min_total: 0, offer_title: "", offer_detail: "", basket_difference: 0 },
    {min_total: 0, offer_title: "", offer_detail: ""}), action) => {
    switch(action.type) {
        case 'UPDATE_BASKET': {
            const newstate = new BasketState({
                min_total: action.offer.min_total,
                offer_title: action.offer.offer_title,
                offer_detail: action.offer.offer_detail,
                basket_difference: action.offer.basket_difference
            }, {
                min_total: action.curr_offer.min_total,
                offer_title: action.curr_offer.offer_title,
                offer_detail: action.curr_offer.offer_detail,
            });
            console.log('basket reduced', newstate);
            return newstate;
        }
        default: return state;
    }
}