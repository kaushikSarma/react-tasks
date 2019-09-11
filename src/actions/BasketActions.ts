import { Dispatch } from 'redux';

export enum BasketActionsTypes {
    UPDATE_BASKET = "UPDATE_BASKET",
}

export const updateBasket = (offer, curr_offer) => {
    return (dispatch: Dispatch) => {
        console.log('before dispatch');
        dispatch({
            type: BasketActionsTypes.UPDATE_BASKET,
            offer: offer,
            curr_offer: curr_offer 
        });
    }
}