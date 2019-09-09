import * as React from 'react';
import { connect } from 'react-redux';

import './index.scss';

interface ProductItemMiniProps {
    url: string
}

class ProductItemMini extends React.Component<ProductItemMiniProps> {
    render() {
        return (<div className='productitem-preview' style={({backgroundImage: `url(${this.props.url})`})}>
        </div>);
    }
}

export default connect()(ProductItemMini);