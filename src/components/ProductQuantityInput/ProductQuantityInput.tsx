import * as React from 'react';
import { connect } from 'react-redux';

import * as SearchActions from '@action/SearchActions';

import './index.scss';

interface ProductQtyProps {
    qty: number,
    id: string,
    updateQty(id, n)
}

class ProductQuantityInput extends React.Component<ProductQtyProps> {
    render() {
        const q = this.props.qty
        return <div className='quantity-control'>
            {(q === undefined || q === 0)
            && <span className='qty-add-button' onClick={(event) => { event.stopPropagation(); this.props.updateQty(this.props.id, 1); }}>Add</span>
            }{ q >= 1 && <React.Fragment>
                <span className='qty-button' onClick={(event) => { event.stopPropagation(); this.props.updateQty(this.props.id, -1); }}>-</span>
                <span className='qty-display'>{q !== undefined ? q : 0}</span>
                <span className='qty-button' onClick={(event) => { event.stopPropagation(); this.props.updateQty(this.props.id, 1); }}>+</span>
            </React.Fragment>
            }
        </div>
    }
}

const mapDispatchToProps = {
    updateQty: SearchActions.updateQty
}

export default connect(null, mapDispatchToProps)(ProductQuantityInput);

