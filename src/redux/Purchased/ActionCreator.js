import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const itemLoading = () => ({
    type: ActionTypes.PURCHASED_ITEM_LOADING
});

export const itemFetchFailed = (errmess) => ({
    type: ActionTypes.PURCHASED_ITEM_FETCH_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_PURCHASED_ITEMS,
    payload: items
});

export const fetchPurchasedItem = () => (dispatch) => {
    dispatch(itemLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'purchased' ,{
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