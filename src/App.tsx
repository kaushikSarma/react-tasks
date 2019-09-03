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
        <Switch>
          <Route
            path={"/search"}
            render={() => (
              <div className="mainContent">
                <SearchPage />
              </div>
            )}
          ></Route>
          <Route
            path={"/manage-cards"}
            render={() => (
              <div className="mainContent">
                <CardsPage />
              </div>
            )}
          ></Route>
          <Redirect from="/" to="/manage-cards"></Redirect>
        </Switch>
      </React.Fragment>
    );
  };
}
