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
      response.json().then(data => {
        let CacheState = JSON.parse(window.localStorage.getItem(CONST_STORAGE.CC_STORAGE));
        console.log(CONST_STORAGE.CC_STORAGE, CacheState);
        if (CacheState !== null && CacheState.savedCards !== undefined) {
          this.props.AppStore.dispatch({
            type: "READ_CC_CACHE",
            savedCurrentID: CacheState.savedCards.currentCardID,
            savedCards: CacheState.savedCards.cards,
            savedValidation: CacheState.validation
          });
        }
        this.props.AppStore.dispatch({
          type: "UPDATE_CC_CONFIG",
          configdata: data
        });
      });
    });

    fetch(CONST_URLS.SEARCH_FILTERS_URL).then(response => {
      if (response.status !== 200) {
        console.log("Could not load search filters!");
        return;
      }
      response.json().then(data => {
          let CacheState = JSON.parse(window.localStorage.getItem(CONST_STORAGE.SEARCH_STORAGE));
          console.log(CONST_STORAGE.SEARCH_STORAGE, CacheState);
          if(CacheState !== null && CacheState.filtersList !== undefined) {
              this.props.AppStore.dispatch({
                  type: 'READ_SEARCH_CACHE',
                  filterBrand: CacheState.filtersList.BRAND,
                  filterColor: CacheState.filtersList.COLOR,
                  filterPrice: CacheState.filtersList.PRICE,
              })
          }
          this.props.AppStore.dispatch({
              type: 'UPDATE_SEARCH_FILTERS',
              filterdata: data
          })
      });
    });
  }

  componentDidUpdate = () => {
    let CreditCardCacheString = JSON.stringify(this.props.AppStore.getState().CreditCardsAppReducer);
    let SearchCacheString = JSON.stringify(this.props.AppStore.getState().SearchAppReducer);
    console.log("Component Updated", {CreditCardCacheString, SearchCacheString});
    window.localStorage.setItem(CONST_STORAGE.CC_STORAGE, CreditCardCacheString);
    window.localStorage.setItem(CONST_STORAGE.SEARCH_STORAGE, SearchCacheString);
  };
  addNewCreditCardHandler = cardData => {
    this.props.AppStore.dispatch({
      type: "ADD_CARD",
      cardData: cardData
    });
  };
  removeCreditCardById = (cardID: number) => {
    if (confirm("Are you sure?")) {
      this.props.AppStore.dispatch({
        type: "REMOVE_CARD",
        cardID: cardID
      });
    }
  };
  editCreditCard = cardData => {
    this.props.AppStore.dispatch({
      type: "EDIT_CARD",
      cardData: cardData
    });
  };
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
