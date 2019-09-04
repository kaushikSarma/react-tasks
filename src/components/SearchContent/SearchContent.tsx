import * as React from 'react';

import './index.scss';
import ProductItem from '@component/ProductItem/ProductItem';
import { Product } from '@data/Product';

interface SearchContentProps {
    products: Product[],
    searchQuery: string
    sort(sortby);
}

interface SearchContentState {
    sortBy: string
}
export default class SearchContent extends React.Component<SearchContentProps, SearchContentState> {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'RELEVANCE'
        };
    }
    sort = (sortby) => {
        this.setState({
            sortBy: sortby
        }, () => {
            this.props.sort(this.state.sortBy)
        });
    }
    render() {
        const searchstring = this.props.searchQuery.length > 0 ? this.props.searchQuery : "shoes";
        return <div className='results-section'>
            <h3>Showing {this.props.products.length} results for "{searchstring}"</h3>
            <div className='sort-bar'>
                <label>Sort By</label>
                <span className={`sort-control ${this.state.sortBy === "RELEVANCE" ? "active" : ""}`} onClick={() => this.sort('RELEVANCE')}>Relevance</span>
                <span className={`sort-control ${this.state.sortBy === "PRICE_ASC" ? "active" : ""}`} onClick={() => this.sort('PRICE_ASC')}>Price -- Low to High</span>
                <span className={`sort-control ${this.state.sortBy === "PRICE_DSC" ? "active" : ""}`} onClick={() => this.sort('PRICE_DSC')}>Price -- High to Low</span>
            </div>
            <div className='result-list'>
                {this.props.products.map((product, index) => <ProductItem {...product} key={`product-${index}`} />)}
            </div>
        </div>
    }
}