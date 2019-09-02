import * as React from 'react';

import './index.scss';
import ProductItem from '@component/ProductItem/ProductItem';

interface SearchContentProps {
    productsList: {}[],
    filtersList: {},
    searchQuery: string
}
export default class SearchContent extends React.Component<SearchContentProps> {
    constructor(props) {
        super(props);
    }

    render() {
        const searchstring = this.props.searchQuery.length > 0 ? this.props.searchQuery : "shoes";
        return <div className='results-section'>
            <h3>Showing {this.props.productsList['products'].length} results for "{searchstring}"</h3>
            <div className='sort-bar'>
                <label>Sort By</label>
                <span className='sort-control'>Relevance</span>
                <span className='sort-control'>Price -- Low to High</span>
                <span className='sort-control'>Price -- High to Low</span>
            </div>
            <div className='result-list'>
                {this.props.productsList['products'].map((product, index) => <ProductItem {...product} key={`product-${index}`} />)}
            </div>
        </div>
    }
}