import * as ActionTypes from './ActionTypes';

export const Friends = (state = {
        isLoading: true,
        errMess: null,
        friends: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FIRENDS_FETCH_REQUEST:
            return {...state, isLoading: true, errMess: null, friends: []};

        case ActionTypes.FIRENDS_FETCH_SUCCESS:
            return {...state, isLoading: false, errMess: null, friends: action.payload};

        case ActionTypes.FIRENDS_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, friends: []};

        default:
            return state;
    }
}