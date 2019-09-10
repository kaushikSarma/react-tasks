import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { CreditCardsAppReducer } from 'reducers/CreditCardsAppReducer';
import { SearchAppReducer } from 'reducers/SearchppReducer';
import { BasketReducer } from 'reducers/BasketReducer';
// importing components
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// importing styles
import './resetStyles.scss';
import './palette.scss';
import './index.scss';

const RootReducer = combineReducers({ CreditCardsAppReducer, SearchAppReducer, BasketReducer });
export const AppStore = createStore(RootReducer, applyMiddleware(thunk));

const render = () => ReactDOM.render(
    <BrowserRouter>
        <Provider store={AppStore}>
            <App />
        </Provider>
    </BrowserRouter> 
    , document.getElementById('root'))
render();
