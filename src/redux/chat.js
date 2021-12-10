import * as ActionTypes from './ActionTypes';

export const Chat = (state = {
        isLoading: false,
        errMess: null,
        chat: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.POST_CHAT:
            return {...state, isLoading: false, errMess: null, chat: action.payload};

        case ActionTypes.CHAT_LOADING:
            return {...state, isLoading: true, errMess: null, chat: []};

        case ActionTypes.ADD_CHAT:
            var newChat = action.payload;
            return {...state, chat: state.chat.concat(newChat)};
        
        case ActionTypes.CHAT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, chat: []};
    

        default:
            return state;
    }
}