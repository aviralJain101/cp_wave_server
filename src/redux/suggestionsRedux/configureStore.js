import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Suggestions } from './suggestions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            suggestions: Suggestions
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}