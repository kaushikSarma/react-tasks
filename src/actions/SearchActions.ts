import { Dispatch } from 'redux';
import { CONST_URLS } from '@data/Constants';
import { AppStore } from '../index';
import { BasketActionsTypes } from '@action/BasketActions';

export enum SearchPageActions {
    READ_FILTERS = "READ_SEARCH_FITLERS",
    UPDATE_RESULTS = "UPDATE_SEARCH_FILTERS",
    UPDATE_CATALOG = "UPDATE_CATALOG",
    INCREASE_QTY = "INCREASE_QTY",
    DECREASE_QTY = "DECREASE_QTY",
    EMPTY_BASKET = "EMPTY_BASKET",
}

export const readCache = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SearchPageActions.READ_FILTERS
        }); 
    }
}

export const updateFilters = (data) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SearchPageActions.UPDATE_RESULTS,
            filterdata: data
        });
    }
}

export function updateCatalog(data) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SearchPageActions.UPDATE_CATALOG,
            data: data
        });
    }
}

export function updateQty(productid, qty) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: qty === 1 ? SearchPageActions.INCREASE_QTY : SearchPageActions.DECREASE_QTY,
            id: productid
        });
        console.log('store state ', AppStore.getState().BasketReducer);
        const total_price = AppStore.getState().SearchAppReducer.products
                            .filter(p => p.qty !== undefined && p.qty > 0)
                            .map(p => p.qty * p.price.final_price)
                            .reduce((p1, p2) => p1 + p2, 0);
        console.log('total', total_price);

        return fetch(`${CONST_URLS.GET_NEXT_OFFER}?amount=${total_price}`)
        .then(response => response.json(),  err => { console.log(err) })
        .then(data => { 
            console.log(data, 'new action');
            return dispatch({
                type: BasketActionsTypes.UPDATE_BASKET,
                offer: data.next_offer,
                curr_offer: data.curr_offer
            });
        })
        .catch(err =>{ console.log(err)});
    }
}

export const emptyBasket = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SearchPageActions.EMPTY_BASKET
        })
    }
}