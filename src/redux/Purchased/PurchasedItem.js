import * as ActionTypes from './ActionTypes';
import isEqual from 'lodash.isequal';

export const PurchasedItem = (state = {
        isLoading: false,
        errMess: null,
        items: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.PURCHASED_ITEM_LOADING:
            return {...state, isLoading: true,isPurchasing: false , errMess: null, items: []};
        
        case ActionTypes.PURCHASED_ITEM_FETCH_FAILED:
            return {...state, isLoading: false, isPurchasing: false, errMess: action.payload, items: []};

        
        case ActionTypes.ADD_PURCHASED_ITEMS:
            return {...state, isLoading: false, isPurchasing: false, errMess: null, items: action.payload};
            
        default:
            return state;
    }
}