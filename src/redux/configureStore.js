import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';

import { Auth } from './auth';
import { Suggestions } from './suggestions';
import { SellItem } from './Sell/SellItem';
import { MarketItem } from './Market/MarketItem';
import { PurchasedItem } from './Purchased/PurchasedItem';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { Searches } from './searches';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            suggestions: Suggestions,
            searches: Searches,
            sellItem: SellItem,
            marketItem: MarketItem,
            purchasedItem: PurchasedItem,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}