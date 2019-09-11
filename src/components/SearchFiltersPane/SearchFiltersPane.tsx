import * as React from "react";
import * as SearchActions from "@action/SearchActions";
import { connect } from "react-redux";
import "./index.scss";
import { CONST_URLS } from "@data/Constants";
import FormInput from "@component/FormInput";
import FormRangeInput from "@component/FormRangeInput";
import FormMultiCheckBoxInput from "@component/FormMultiCheckBoxInput";

interface SearchFilterProps {
  filters: {
    BRAND: { type: string; values: {}[] };
    COLOR: { type: string; values: {}[] };
    PRICE: { type: string; values: {key: string, displayValue: string}[] };
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
  exists(object) {
    return (
      object !== null &&
      object !== undefined &&
      object !== {} &&
      object.length > 0
    );
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

  updateFilters = (name, value, callback?) => {
    console.log(name);
    switch (name) {
      case "priceinput": {
        this.setState({ minprice: value['min'], maxprice: value['max'] },
        () => {
          this.getSearchReults();
          if (callback !== undefined) callback();
        });
        break;
      }
      case "brand": {
        this.setState({ brand: value },
        () => {
          this.getSearchReults();
          if (callback !== undefined) callback();
        });
        break;
      }
      case "colorChoices": {
        this.setState({ colors: value },
        () => {
          this.getSearchReults();
          if (callback !== undefined) callback();
        });
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
      <div className="search-filters position-absolute">
        <div className="search-filter-group">
          <h3>Filters</h3>
        </div>
        <div className="search-filter-group">
          <FormRangeInput
            title="Price"
            type="range-select"
            name="priceinput"
            rangeofvalues={this.props.filters.PRICE.values}
            onChange={this.updateFilters}
          />
        </div>
        <div className="search-filter-group">
          <FormInput 
            title="Brand"
            type="text"
            name="brand"
            placeholder="Search Brand"
            onChange={this.updateFilters}
            showSuggestionsNum={5}
            suggestionsList={this.props.filters.BRAND.values}
          />
        </div>
        <div className="search-filter-group">
          <FormMultiCheckBoxInput
            name="colorChoices"
            valueslist={this.props.filters.COLOR.values}
            onChange={this.updateFilters}
            title="Colors"
          />
        <br />
        </div>
      </div>
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
