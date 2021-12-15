import * as ActionTypes from './ActionTypes';

export const CourseTags = (state = {
        isLoading: false,
        errMess: null,
        courseTags: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.COURSE_TAGS_LOADING:
            return {...state, isLoading: true, errMess: null, courseTags: []};

        case ActionTypes.COURSE_TAGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, courseTags: []};

        case ActionTypes.ADD_COURSE_TAGS:
            return {...state, isLoading: false, errMess: null, courseTags: action.payload};

        default:
            return state;
    }
}