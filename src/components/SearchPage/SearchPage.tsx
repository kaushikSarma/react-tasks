import * as React from 'react';

import SearchFilterPane from '@component/SearchFiltersPane';
import SearchContent from '@component/SearchContent';
import { CONST_URLS } from '@data/Constants';

import * as SearchActions from '@action/SearchActions';

import './index.scss';
import { Product } from '@data/Product';
import { connect } from 'react-redux';

interface SearchPageProps {
    products: Product[];
    updateCatalog(data);
}
interface SearchPageState {
    sortedProducts: Product[],
    sortby: string,
    minprice: number
    maxprice: number;
    brand: string;
    colors: {}[];
    isLoading: boolean;
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    constructor(props) {
        super(props);
        this.state = {
            sortedProducts: [...this.props.products],
            sortby: 'RELEVANCE',
            minprice: 0,
            maxprice: Number.MAX_SAFE_INTEGER,
            brand: '',
            colors: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        fetch(CONST_URLS.SEARCH_PRODUCTS_URL).then(response => {
            if (response.status !== 200) {
                console.log("Could not fetch list of ");
                return;
            }
            response.json().then(data => {
                console.log("PRODUCTS FROM API", data);
                this.props.updateCatalog(data.products);
                this.setState({
                    sortedProducts: [...data.products],
                    isLoading: false
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
            <SearchFilterPane setFilters={this.setFilters} />
            <SearchContent searchQuery={window.location.search.slice(1)} sort={this.sort} isLoading={this.state.isLoading} products={this.state.sortedProducts} />
        </div>
    }
}

const mapStateToProps = state => ({
    products: state.SearchAppReducer.products
})

const mapDispatchToProps = {
    updateCatalog: SearchActions.updateCatalog
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);