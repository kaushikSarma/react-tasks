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
    products: {}[]
}

interface SearchPageState {
    sortedProducts: {}[],
    sortby: string,
    minprice: number
    maxprice: number;
    brand: string;
    colors: {}[];
}

const mapStateToProps = (state) => {

}

export default class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
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