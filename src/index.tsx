import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';
import { CreditCardsAppReducer } from 'reducers/CreditCardsAppReducer';
import { SearchAppReducer } from 'reducers/SearchppReducer';

// importing components
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// importing styles
import './resetStyles.scss';
import './palette.scss';
import './index.scss';

const RootReducer = combineReducers({ CreditCardsAppReducer, SearchAppReducer });
const AppStore = createStore(RootReducer);

const render = () => ReactDOM.render(
    <BrowserRouter>
        <Provider store={AppStore}>
            <App AppStore={AppStore} />\
        </Provider>
    </BrowserRouter> 
    , document.getElementById('root'))
AppStore.subscribe(render);
render();
