import * as React from "react";
import * as SearchActions from "@action/SearchActions";
import { connect } from "react-redux";
import "./index.scss";
import { CONST_STORAGE, CONST_URLS } from "@data/Constants";

interface SearchFilterProps {
  filters: {
    BRAND: { type: string; values: {}[] };
    COLOR: { type: string; values: {}[] };
    PRICE: { type: string; values: {}[] };
  };
  setFilters(filters);
}

interface SearchFiltersActions {
  readCache();
  updateFilters(CacheState);
}

interface SearchFilterState {
  minprice: string;
  maxprice: string;
  brand?: string;
  colors?: boolean[];
}

class SearchFilterPane extends React.Component<
  SearchFilterProps & SearchFiltersActions,
  SearchFilterState
> {
  height: number;
  width: number;

  constructor(props) {
    super(props);
    this.state = {
      minprice: "Min",
      maxprice: "Max",
      brand: "",
      colors: new Array(this.getNumColors()).fill(true)
    };
  }

  isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

  componentDidMount = () => {
    console.log(this.props.readCache());
    this.props.readCache();
    console.log('Filters', this.props.filters);
    if (Object.values(this.props.filters).some(f => this.isEmpty(f) || f.values === [])) {
      fetch(CONST_URLS.SEARCH_FILTERS_URL).then(response => {
        if (response.status !== 200) {
          console.log("Could not load search filters!");
          return;
        }
        response.json().then(data => {
          console.log('Filters from api', data);
          this.props.updateFilters(data);
        });
      });
    }
  };

  exists(object) {
    return (
      object !== null &&
      object !== undefined &&
      object !== {} &&
      object.length > 0
    );
  }
  getNumColors = (): number => {
    if (
      this.exists(this.props.filters.COLOR) &&
      this.exists(this.props.filters.COLOR.values)
    ) {
      return this.props.filters.COLOR.values.length;
    }
    return 0;
  };
  getSelectedColors = (): {} =>
    this.props.filters.COLOR.values.filter(
      (c, index) => this.state.colors[index]
    );

  updateFilters = event => {
    const name = event.target.name;
    const val =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    switch (name) {
      case "minprice": {
        event.preventDefault();
        const minindex = this.props.filters.PRICE.values.findIndex(
          e => e["key"] === val
        );
        const maxindex = this.props.filters.PRICE.values.findIndex(
          e => e["key"] === this.state.maxprice
        );
        minindex < maxindex &&
          this.setState({ minprice: val }, () => {
            this.getSearchReults();
          });
        break;
      }
      case "maxprice": {
        event.preventDefault();
        const minindex = this.props.filters.PRICE.values.findIndex(
          e => e["key"] === this.state.minprice
        );
        const maxindex = this.props.filters.PRICE.values.findIndex(
          e => e["key"] === val
        );
        minindex < maxindex &&
          this.setState({ maxprice: val }, () => {
            this.getSearchReults();
          });
        break;
      }
      case "brand": {
        event.preventDefault();
        this.setState(
          {
            brand: val
          },
          () => {
            this.getSearchReults();
          }
        );
        break;
      }
      case "colorChoices": {
        let newstate = this.state.colors;
        newstate[event.target.dataset["index"]] = val;
        this.setState(
          {
            colors: newstate
          },
          () => {
            this.getSearchReults();
          }
        );
        break;
      }
    }
  };

  getSearchReults = () => {
    this.props.setFilters({
      minprice: this.state.minprice,
      maxprice: this.state.maxprice,
      brand: this.state.brand,
      colors: this.getSelectedColors()
    });
  };

  render = () => {
    return (
      <form className="search-filters position-absolute">
        <div className="search-filter-group">
          <h3>Filters</h3>
        </div>
        <div className="search-filter-group">
          <h4>Price</h4>
          <select
            name="minprice"
            value={this.state.minprice}
            onChange={this.updateFilters}
          >
            {this.props.filters.PRICE.values !== undefined &&
              this.props.filters.PRICE.values.map(value => (
                <option key={`min-${value["key"]}`} value={value["key"]}>
                  {value["displayValue"]}
                </option>
              ))}
          </select>
          <i className="separator">to</i>
          <select
            name="maxprice"
            value={this.state.maxprice}
            onChange={this.updateFilters}
          >
            {this.props.filters.PRICE.values !== undefined &&
              this.props.filters.PRICE.values.map(value => (
                <option key={`max-${value["key"]}`} value={value["key"]}>
                  {value["displayValue"]}
                </option>
              ))}
          </select>
        </div>
        <div className="search-filter-group">
          <h4>Brand</h4>
          <input
            type="text"
            name="brand"
            placeholder="Search Brand"
            onChange={this.updateFilters}
            value={this.state.brand}
          ></input>
        </div>
        <div className="search-filter-group">
          <h4>Color</h4>
          {this.exists(this.props.filters.COLOR.values) &&
            this.props.filters.COLOR.values.map((choice, index) => {
              return (
                <div key={`color-${choice["title"]}`} className="color-input">
                  <input
                    type="checkbox"
                    name="colorChoices"
                    onChange={this.updateFilters}
                    data-index={index}
                    checked={this.state.colors[index]}
                  ></input>
                  <span
                    className="color-display-bubble"
                    style={{ background: choice["color"] }}
                  ></span>
                  <label>{choice["title"]}</label>
                </div>
              );
            })}
          <br />
        </div>
      </form>
    );
  };
}

const mapStateToProps = state => ({
  filters: state.SearchAppReducer.filtersList
});

const mapDispatchToProps = {
  readCache: SearchActions.readCache,
  updateFilters: SearchActions.updateFilters,
};

export default connect( mapStateToProps, mapDispatchToProps )(SearchFilterPane);
