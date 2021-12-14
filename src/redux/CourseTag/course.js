import * as ActionTypes from './ActionTypes';

export const CourseTag = (state = {
        isLoading: false,
        errMess: null,
        courseTag: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.COURSE_TAGS_LOADING:
            return {...state, isLoading: true, errMess: null, courseTag: []};

        case ActionTypes.COURSE_TAGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, courseTag: []};

        case ActionTypes.ADD_COURSE_TAG:
            return {...state, isLoading: false, errMess: action.message, courseTag: action.payload};

        default:
            return state;
    }
}