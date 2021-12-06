import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/* ==========================================================
                SUGGESTIONS
============================================================*/


export const requestSuggestions = (searchTerm) => {
    return {
        type: ActionTypes.SUGGESTIONS_REQUEST,
        searchTerm
    }
}
  
export const receiveSuggestions = (suggestions) => {
    return {
        type: ActionTypes.SUGGESTIONS_SUCCESS,
        suggestions: suggestions
    }
}
  
export const SuggestionsError = (message) => {
    return {
        type: ActionTypes.SUGGESTIONS_FAILED,
        message
    }
}


export const fetchSuggestions = (searchTerm) => (dispatch) => {
    dispatch(requestSuggestions(searchTerm));
    
    return fetch(baseUrl+'suggestions?searchTerm='+searchTerm)
      .then(response => {
        if (response.ok) {
            // console.log(response);
            // console.log(response.json());

            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(suggestions => dispatch(receiveSuggestions(suggestions)))
    .catch(error => dispatch(SuggestionsError(error.message)));
}
