import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { favorites } from './favorites';
import { Auth } from './auth';
import { Suggestions } from './suggestions';
import { Friends } from './friends';
import { Chat } from './chat';
import { CourseTags } from './CourseTags/courseTag';
import { BoughtCourse } from './Course/BoughtCourse/course';
import { CreatedCourse } from './Course/CreatedCourse/course';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { Searches } from './searches';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            suggestions: Suggestions,
            searches: Searches,
            friends: Friends,
            chat: Chat,
            courseTags: CourseTags,
            boughtCourse: BoughtCourse,
            createdCourse: CreatedCourse,
            favorites,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}