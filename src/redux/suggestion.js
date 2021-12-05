import * as ActionTypes from './ActionTypes';

export const Suggestions = (state = {
        isLoading: true,
        errMess: null,
        search: null,
        suggestions: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.SUGGESTIONS_REQUEST:
            return {...state, isLoading: false, errMess: null, search:action.searchTerm, suggestions: []};

        case ActionTypes.SUGGESTIONS_SUCCESS:
            return {...state, isLoading: true, errMess: null, search:action.searchTerm, suggestions: action.suggestions};

        case ActionTypes.SUGGESTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.message, search:action.searchTerm, suggestions: []};

        default:
            return state;
    }
}