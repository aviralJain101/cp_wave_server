import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const tagsLoading = () => ({
    type: ActionTypes.COURSE_TAGS_LOADING
});

export const tagsFailed = (errmess) => ({
    type: ActionTypes.COURSE_TAGS_FAILED,
    payload: errmess
});

export const addTags = (tags) => ({
    type: ActionTypes.ADD_COURSE_TAG,
    payload: tags
});

export const fetchCourseTags = () => (dispatch) => {
    dispatch(tagsLoading());

    return fetch(baseUrl + 'coursetags')
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
        .then(tags => dispatch(addTags(tags)))
        .catch(error => dispatch(tagsFailed(error.message)));
}

