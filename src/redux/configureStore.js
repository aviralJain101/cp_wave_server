import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Suggestions } from './suggestions';
import { SellItem } from './Sell/SellItem';
import { MarketItem } from './Market/MarketItem';
import { PurchasedItem } from './Purchased/PurchasedItem';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            suggestions: Suggestions,
            sellItem: SellItem,
            marketItem: MarketItem,
            purchasedItem: PurchasedItem
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}