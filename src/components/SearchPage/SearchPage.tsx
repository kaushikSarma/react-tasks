import * as React from 'react';

import './index.scss';
import SearchFilterPane from '@component/SearchFiltersPane';
import SearchContent from '@component/SearchContent';

interface SearchPageProps {
    searchfilters:{
        BRAND:{type:string, values:{}[] } ,
        COLOR: {type:string, values:{}[] },
        PRICE: {type:string, values:{}[] },
    };
    productsList: {}[]
}

export default class SearchPage extends React.Component<SearchPageProps> {
    constructor(props) {
        super(props);
        console.log(window.location.search.slice(1));
    }
    render = () => {
        return <div className="search-page-wrapper">
            <SearchFilterPane filters={this.props.searchfilters}></SearchFilterPane>
            <SearchContent searchQuery={window.location.search.slice(1)} filtersList={this.props.searchfilters} productsList={this.props.productsList}></SearchContent>
        </div>
    }
}