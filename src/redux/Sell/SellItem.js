import * as ActionTypes from './ActionTypes';

export const SellItem = (state = {
        isLoading: false,
        isPosting: false,
        errMess: null,
        items: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ITEM_LOADING:
            return {...state, isLoading: true,isPosting: false , errMess: null, items: []};

        case ActionTypes.ITEM_POSTING:
            return {...state, isLoading: false,isPosting: true , errMess: null, items: []};

        case ActionTypes.ITEM_FETCH_FAILED:
            return {...state, isLoading: false, isPosting: false, errMess: action.payload, items: []};

        case ActionTypes.ITEM_POST_FAILED:
            return {...state, isLoading: false, isPosting: false, errMess: action.payload, items: []};

        case ActionTypes.ADD_ITEM:
            var item = action.payload;
            return {...state, isLoading: false, isPosting: false, errMess: null,items: state.items.concat(item)};
            
        default:
            return state;
    }
}