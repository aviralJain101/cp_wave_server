import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const itemLoading = () => ({
    type: ActionTypes.MARKET_ITEM_LOADING
});

export const itemFetchFailed = (errmess) => ({
    type: ActionTypes.MARKET_ITEM_FETCH_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_MARKET_ITEMS,
    payload: items
});

export const fetchMarketItem = () => (dispatch) => {
    dispatch(itemLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'market' ,{
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

export const itemPurchasing = () => ({
    type: ActionTypes.ITEM_PURCHASING
});

export const itemPurchaseFailed = (errmess) => ({
    type: ActionTypes.ITEM_PURCHASE_FAILED,
    payload: errmess
});

export const removeItem = (item) => ({
    type: ActionTypes.REMOVE_PURCHASED_ITEM,
    payload: item
});
export const buyItem = (item) => (dispatch) => {
    dispatch(itemPurchasing());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'market', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
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
    .then(item => dispatch(removeItem(item)))
    .catch(error => dispatch(itemPurchaseFailed(error.message)));

}



