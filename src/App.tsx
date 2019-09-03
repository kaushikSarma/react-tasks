import * as React from "react";
import { Switch, Route, Redirect } from "react-router";

import Header from "@component/Header";
import CardsPage from "@component/CardsPage";
import SearchPage from "@component/SearchPage";
import { CONST_URLS, CONST_STORAGE } from "@data/Constants";


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <React.Fragment>
        <Header />
        <div className="mainContent">
        <Switch>
          <Route path={"/search"} render={() => <SearchPage />}/>
          <Route path={"/manage-cards"} render={() => <CardsPage />} />
          <Redirect from="/" to="/manage-cards"></Redirect>
        </Switch>
        </div>
      </React.Fragment>
    );
  };
}
