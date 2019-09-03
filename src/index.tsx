import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

// const baseurl = window.location;
// console.log(baseurl.href);
const render = () => ReactDOM.render(<BrowserRouter><App AppStore={AppStore} /></BrowserRouter> , document.getElementById('root'))
AppStore.subscribe(render);
render();
