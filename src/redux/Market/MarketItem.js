import * as ActionTypes from './ActionTypes';
import isEqual from 'lodash.isequal';

export const MarketItem = (state = {
        isLoading: false,
        isPurchasing: false,
        errMess: null,
        items: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.MARKET_ITEM_LOADING:
            return {...state, isLoading: true,isPurchasing: false , errMess: null, items: []};
        
        case ActionTypes.MARKET_ITEM_FETCH_FAILED:
            return {...state, isLoading: false, isPurchasing: false, errMess: action.payload, items: []};

        
        case ActionTypes.ADD_MARKET_ITEMS:
            return {...state, isLoading: false, isPurchasing: false, errMess: null, items: action.payload};

        case ActionTypes.ITEM_PURCHASING:
            return {...state, isLoading: false,isPurchasing: true , errMess: null};

        
        case ActionTypes.ITEM_PURCHASE_FAILED:
            return {...state, isLoading: false, isPurchasing: false, errMess: action.payload};

        case ActionTypes.REMOVE_PURCHASED_ITEM:
            var toRemove = action.payload;
            var item = state.items.filter((item) => (item._id.toString() != toRemove._id.toString()));
            return {...state, isLoading: false, isPurchasing: false, errMess: null,items: item};
            
        default:
            return state;
    }
}