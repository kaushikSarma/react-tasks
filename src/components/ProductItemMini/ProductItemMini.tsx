import * as React from 'react';
import { connect } from 'react-redux';

import './index.scss';

interface ProductItemMiniProps {
    url: string;
    qty: number;
}

class ProductItemMini extends React.Component<ProductItemMiniProps> {
    render() {
        return (<div className='productitem-preview' data-count={this.props.qty} style={({backgroundImage: `url(${this.props.url})`})}>
        </div>);
    }
}

export default connect()(ProductItemMini);