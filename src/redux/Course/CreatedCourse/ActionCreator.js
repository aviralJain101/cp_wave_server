import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../../shared/baseUrl';

export const courseLoading = () => ({
    type: ActionTypes.COURSE_LOADING
});

export const courseFailed = (errmess) => ({
    type: ActionTypes.COURSE_FAILED,
    payload: errmess
});

export const addCourse = (course) => ({
    type: ActionTypes.ADD_COURSE,
    payload: course
});

export const appendCourse = (course) => ({
    type: ActionTypes.APPEND_COURSE,
    payload: course
});

export const fetchCreatedCourse = () => (dispatch) => {
    dispatch(courseLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'courses?type=created',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
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
    .catch(error => dispatch(courseFailed(error.message)));
}

export const postCreatedCourse = (courseData) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'courses', {
        method: "POST",
        body: JSON.stringify(courseData),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
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
    .then(course => { console.log('Course Created', course); dispatch(appendCourse(course)); })
    .catch(error => dispatch(courseFailed(error.message)));
}
