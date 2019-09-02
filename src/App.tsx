import * as React from "react";
import { Switch, Route, Redirect } from "react-router";

import Header from "@component/Header";
import CardsPage from "@component/CardsPage";
import SearchPage from "@component/SearchPage";
import { CONST_URLS, CONST_STORAGE } from "@data/Constants";

interface AppProps {
  AppStore;
}

export default class App extends React.Component<AppProps> {
  constructor(props) {
    super(props);
    fetch(CONST_URLS.CCVLAIDATION_URL).then(response => {
      if (response.status !== 200) {
        console.log("Could not load credit card validations config!");
        return;
      }
      let CcCacheState = JSON.parse(window.localStorage.getItem(CONST_STORAGE.CC_STORAGE));
      console.log(CONST_STORAGE.CC_STORAGE, CcCacheState);
      if (CcCacheState !== null && CcCacheState.savedCards !== undefined) {
        this.props.AppStore.dispatch({
          type: "READ_CC_CACHE",
          savedCurrentID: CcCacheState.savedCards.currentCardID,
          savedCards: CcCacheState.savedCards.cards,
          savedValidation: CcCacheState.validation
        });
      }
      response.json().then(data => {
        this.props.AppStore.dispatch({
          type: "UPDATE_CC_CONFIG",
          configdata: data
        });
      });
    });
    {
      let CacheState = JSON.parse(window.localStorage.getItem(CONST_STORAGE.SEARCH_STORAGE));
      console.log(CONST_STORAGE.SEARCH_STORAGE, CacheState);
      if(CacheState !== null && CacheState.filtersList !== undefined) {
          this.props.AppStore.dispatch({
              type: 'READ_SEARCH_CACHE',
              filterBrand: CacheState.filtersList.BRAND,
              filterColor: CacheState.filtersList.COLOR,
              filterPrice: CacheState.filtersList.PRICE,
              sortBy: CacheState.productsList === undefined ? "REL" : CacheState.productsList.sortBy,
              products: CacheState.productsList === undefined ? [] : CacheState.productsList.products,
          })
      } else {
        fetch(CONST_URLS.SEARCH_FILTERS_URL).then(response => {
          if (response.status !== 200) {
            console.log("Could not load search filters!");
            return;
          }
          response.json().then(data => {
              this.props.AppStore.dispatch({
                type: 'UPDATE_SEARCH_FILTERS',
                filterdata: data
              })
              this.updateSearchCache();
          });
        });
      }
      fetch(CONST_URLS.SEARCH_PRODUCTS_URL).then(response => {
        if(response.status !== 200) {
          console.log("Could not fetch list of ");
          return;
        }
        response.json().then(data => {
          console.log("PRODUCTS FROM API",response);
            this.props.AppStore.dispatch({
              type: 'UPDATE_SEARCH_LIST',
              productList: data.products
            });
            this.updateSearchCache();
        });
      })
    }
  }

  addNewCreditCardHandler = cardData => {
    this.props.AppStore.dispatch({
      type: "ADD_CARD",
      cardData: cardData
    });
    console.log('Update on add');
    this.updateCCCache();
  };
  
  removeCreditCardById = (cardID: number) => {
    if (confirm("Are you sure?")) {
      this.props.AppStore.dispatch({
        type: "REMOVE_CARD",
        cardID: cardID
      });
      console.log('Update on remove');
      this.updateCCCache();
    }
  };

  editCreditCard = cardData => {
    this.props.AppStore.dispatch({
      type: "EDIT_CARD",
      cardData: cardData
    });
    console.log('Update on edit');
    this.updateCCCache();
  };

  updateCCCache = () => {
    let CreditCardCacheString = JSON.stringify(this.props.AppStore.getState().CreditCardsAppReducer);
    window.localStorage.setItem(CONST_STORAGE.CC_STORAGE, CreditCardCacheString);
  }
  
  updateSearchCache = () => {
    let SearchCacheString = JSON.stringify(this.props.AppStore.getState().SearchAppReducer);
    window.localStorage.setItem(CONST_STORAGE.SEARCH_STORAGE, SearchCacheString);
  }

  render = () => {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route
            path="/search"
            render={() => (
                <div className="mainContent">
                    <SearchPage 
                    searchfilters={this.props.AppStore.getState().SearchAppReducer.filtersList}
                    productsList={this.props.AppStore.getState().SearchAppReducer.productList}
                    />
                </div>
            )}
          ></Route>
          <Route
            path="/manage-cards"
            render={() => (
                <div className="mainContent">
                    <CardsPage
                    validation={this.props.AppStore.getState().CreditCardsAppReducer.validation}
                    editCreditCard={this.editCreditCard}
                    removeCreditCardById={this.removeCreditCardById}
                    addCreditCardHandler={this.addNewCreditCardHandler}
                    cards={this.props.AppStore.getState().CreditCardsAppReducer.savedCards.getCards()}
                    />
                </div>
            )}
          ></Route>
          <Redirect from="/" to="/search"></Redirect>
        </Switch>
      </React.Fragment>
    );
  };
}
