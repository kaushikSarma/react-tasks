import { Dispatch } from 'redux';

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
        })
    }
}

export const emptyBasket = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SearchPageActions.EMPTY_BASKET
        })
    }
}