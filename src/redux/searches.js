import * as ActionTypes from './ActionTypes';

export const Searches = (state = {
        isLoading: false,
        errMess: null,
        searchTerm: null,
        searchResult: null,
        hasMore: true
    }, action) => {
    switch(action.type) {
        case ActionTypes.SEARCH_REQUEST:
            return {...state, isLoading: true, errMess: null, searchTerm:action.searchTerm, searchResult: null,hasMore: true};

        case ActionTypes.SEARCH_SUCCESS:
            return {...state, isLoading: false, errMess: null, searchTerm:action.searchTerm, searchResult: action.searchResult};

        case ActionTypes.SEARCH_FAILED:
            return {...state, isLoading: false, errMess: action.message, searchTerm:action.searchTerm, searchResult: null};

        default:
            return state;
    }
}