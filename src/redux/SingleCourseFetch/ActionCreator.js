import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const courseLoading = () => ({
    type: ActionTypes.COURSE_LOADING
});

export const courseFetchFailed = (errmess) => ({
    type: ActionTypes.COURSE_FETCH_FAILED,
    payload: errmess
});

export const addCourse = (course) => ({
    type: ActionTypes.ADD_COURSE,
    payload: course
});

export const fetchSingleCourse = (courseId) => (dispatch) => {
    dispatch(courseLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`sell/${courseId}` ,{
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
    .then(course => dispatch(addCourse(course)))
    .catch(error => dispatch(courseFetchFailed(error.message)));
}