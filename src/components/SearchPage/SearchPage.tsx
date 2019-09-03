import * as React from 'react';

import { connect } from 'react-redux';

import SearchFilterPane from '@component/SearchFiltersPane';
import SearchContent from '@component/SearchContent';
import { CONST_STORAGE, CONST_URLS } from '@data/Constants';

import './index.scss';
import { Product } from '@data/Product';
interface SearchPageProps {
    searchfilters: {
        BRAND:{type:string, values:{}[] } ,
        COLOR: {type:string, values:{}[] },
        PRICE: {type:string, values:{}[] },
    };
    products: Product[]
}

interface SearchPageActions {
    readCache(data);
    updateFilters(data);
    updateCatalog(data);
}

interface SearchPageState {
    sortedProducts: Product[],
    sortby: string,
    minprice: number
    maxprice: number;
    brand: string;
    colors: {}[];
}

class SearchPage extends React.Component<SearchPageProps & SearchPageActions, SearchPageState> {
    constructor(props) {
        super(props);
        this.state = {
            sortedProducts: [...this.props.products],
            sortby: 'RELEVANCE',
            minprice: 0,
            maxprice: Number.MAX_SAFE_INTEGER,
            brand: '',
            colors: []
        }
    }

    componentDidMount = () => {
        let CacheState = JSON.parse(
            window.localStorage.getItem(CONST_STORAGE.SEARCH_STORAGE)
        );
        console.log(CONST_STORAGE.SEARCH_STORAGE, CacheState);
        if (CacheState !== null && CacheState.filtersList !== undefined) {
            this.props.readCache(CacheState);
        } else {
            fetch(CONST_URLS.SEARCH_FILTERS_URL).then(response => {
                if (response.status !== 200) {
                console.log("Could not load search filters!");
                return;
                }
                response.json().then(data => {
                    this.props.updateFilters(data)
                });
            });
        }
        fetch(CONST_URLS.SEARCH_PRODUCTS_URL).then(response => {
            if (response.status !== 200) {
                console.log("Could not fetch list of ");
                return;
            }
            response.json().then(data => {
                console.log("PRODUCTS FROM API", data);
                this.props.updateCatalog(data);
                this.setState({
                    sortedProducts: [...this.props.products]
                })
            });
        });
    }

    updateList = () => {
        // first filter list of products
        let products = [...this.props.products]
                        .filter(p => p['price']['final_price'] >= this.state.minprice
                                && p['price']['final_price'] <= this.state.maxprice);

        if (this.state.brand.length > 0)
            products = products.filter(p => p['brand'].toLowerCase().indexOf(this.state.brand.toLowerCase()) !== -1)

        if (this.state.colors.length > 0) 
            products = products.filter(p => this.state.colors.some(c => c['color'] === p['colour']['color']))

        // then sort the result
        switch(this.state.sortby) {
            case 'RELEVANCE': {
                this.setState({
                    sortedProducts: products
                });
                break;
            }
            case 'PRICE_ASC': {
                products.sort((p1, p2) => p1['price']['final_price'] - p2['price']['final_price']);
                this.setState({
                    sortedProducts: products
                });
                break;
            }
            case 'PRICE_DSC': {
                products.sort((p1, p2) => p2['price']['final_price'] - p1['price']['final_price']);
                this.setState({
                    sortedProducts: products
                });
                break;
            }
        }
    }

    setFilters = (filters) => {
        console.log(filters);
        // let products = [...this.state.sortedProducts];
        const minprice = filters['minprice'] === 'Min' ? 0 : parseInt(filters['minprice']);
        const maxprice = filters['maxprice'] === 'Max' ? Number.MAX_SAFE_INTEGER : parseInt(filters['maxprice']);
        this.setState({
            minprice: minprice,
            maxprice: maxprice,
            brand: filters['brand'] !== undefined ? filters['brand'] : '',
            colors: filters['colors'] !== undefined ? filters['colors'] : []
        }, this.updateList);
    }

    sort = (sortby) => {
        this.setState({
            sortby: sortby
        }, this.updateList)
    }

    render = () => {
        return <div className="search-page-wrapper">
            <SearchFilterPane filters={this.props.searchfilters} setFilters={this.setFilters} />
            <SearchContent searchQuery={window.location.search.slice(1)} sort={this.sort} filtersList={this.props.searchfilters} products={this.state.sortedProducts} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        searchfilters: state.SearchAppReducer.filtersList,
        products: state.SearchAppReducer.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        readCache: (CacheState) => {
            console.log(CacheState);
            dispatch({
                type: "READ_SEARCH_CACHE",
                filterBrand: CacheState.filtersList.BRAND,
                filterColor: CacheState.filtersList.COLOR,
                filterPrice: CacheState.filtersList.PRICE,
                products: CacheState.products === undefined ? [] : CacheState.products
            });
        },
        updateFilters: (data) => {
            dispatch({
                type: "UPDATE_SEARCH_FILTERS",
                filterdata: data
            });
        },
        updateCatalog: (data) => {
            dispatch({
                type: "UPDATE_SEARCH_CATALOG",
                products: data.products
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);