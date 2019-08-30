import * as React from 'react';

import './index.scss';

export default class SearchContent extends React.Component {
    render() {
        return <div className='results-section'>
            <h3>Showing results for shoes</h3>
            <div className='sort-bar'>
                <label>Sort By</label>
                <span>Relevance</span>
                <span>Price -- Low to High</span>
                <span>Price -- High to Low</span>
            </div>
        </div>
    }
}