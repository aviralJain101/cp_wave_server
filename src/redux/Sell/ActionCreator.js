import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const itemLoading = () => ({
    type: ActionTypes.SELL_ITEM_LOADING
});

export const itemFetchFailed = (errmess) => ({
    type: ActionTypes.SELL_ITEM_FETCH_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_SELL_ITEMS,
    payload: items
});

export const fetchSellItem = () => (dispatch) => {
    dispatch(itemLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'sell' ,{
        headers: {
            'Authorization': bearer
        },
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
    .then(items => dispatch(addItems(items)))
    .catch(error => dispatch(itemFetchFailed(error.message)));
}

export const itemPosting = () => ({
    type: ActionTypes.SELL_ITEM_POSTING
});

export const itemPostFailed = (errmess) => ({
    type: ActionTypes.SELL_ITEM_POST_FAILED,
    payload: errmess
});

export const addItem = (item) => ({
    type: ActionTypes.ADD_SELL_ITEM,
    payload: item
});
export const postItem = (item) => (dispatch) => {
    dispatch(itemPosting());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'sell', {
        method: 'POST',
        body: item,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': bearer
        },
        credentials: 'same-origin'
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
    .then(item => dispatch(addItem(item)))
    .catch(error => dispatch(itemPostFailed(error.message)));

}



