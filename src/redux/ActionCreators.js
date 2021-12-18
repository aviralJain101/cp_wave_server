import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
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
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
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
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postFeedback = (feedback) => (dispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

/* ==========================================================
                SIGNUP
============================================================*/

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}
  
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds) => (dispatch) => {
    // We dispatch requestSignup to kickoff the call to the API
    dispatch(requestSignup(creds))

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If Signup was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveSignup(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(signupError(error.message)))
};



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
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'suggestions?searchTerm='+searchTerm,{
        headers: {
            'Authorization': bearer
        },
    })
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


/* ==========================================================
                SEARCHES
============================================================*/


export const requestSearches = (searchTerm) => {
    return {
        type: ActionTypes.SEARCH_REQUEST,
        searchTerm
    }
}
  
export const receiveSearches = (searchResult) => {
    return {
        type: ActionTypes.SEARCH_SUCCESS,
        searchResult
    }
}
  
export const searchesError = (message) => {
    return {
        type: ActionTypes.SEARCH_FAILED,
        message
    }
}


export const fetchSearches = (searchTerm) => (dispatch) => {
    dispatch(requestSearches(searchTerm));
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    // return fetch(baseUrl+'search?searchTerm='+searchTerm,{
    //     headers: {
    //         'Authorization': bearer
    //     },
    // })
    //   .then(response => {
    //     if (response.ok) {
    //         // console.log(response);
    //         // console.log(response.json());

    //         return response;
    //     }
    //     else {
    //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //         error.response = response;
    //         throw error;
    //     }
    // },
    // error => {
    //     var errmess = new Error(error.message);
    //     throw errmess;
    // })
    // .then(response => response.json())
    // .then(searchResult => dispatch(receiveSearches(searchResult)))
    // .catch(error => dispatch(searchesError(error.message)));
}


/* ==========================================================
                Friends Fetching
============================================================*/


export const requestFriendsFetch = () => {
    return {
        type: ActionTypes.FIRENDS_FETCH_REQUEST
    }
}
  
export const receiveFriendsFetch = (searchResult) => {
    return {
        type: ActionTypes.FIRENDS_FETCH_SUCCESS,
        payload: searchResult
    }
}
  
export const FriendsFetchError = (message) => {
    return {
        type: ActionTypes.FIRENDS_FETCH_FAILED,
        payload: message
    }
}


export const fetchFriends = () => (dispatch) => {
    dispatch(requestFriendsFetch());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'friends',{
        headers: {
            'Authorization': bearer
        },
    }).then(response => {
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
    .then(searchResult => dispatch(receiveFriendsFetch(searchResult)))
    .catch(error => dispatch(FriendsFetchError(error.message)));
}
