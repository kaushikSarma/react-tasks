import * as React from 'React';
import { connect } from 'react-redux';

import './index.scss';
import { Product } from '@data/Product';
import ProductItem from '@component/ProductItem';

import * as SearchActions from '@action/SearchActions';
import ProductItemMini from '@component/ProductItemMini/ProductItemMini';

interface BasketProps {
    products: Product[];
    nextOffer: {min_total: number, offer_title: string, offer_detail: string, basket_difference: number};
    emptyBasket()
}

interface BasketState {
    isExpanded: boolean
}

class Basket extends React.Component<BasketProps, BasketState> {
    constructor(props){
        super(props);
        this.state = {
            isExpanded: false
        }
    }
    render () {
        const products = this.props.products.filter(p => p.qty !== undefined && p.qty > 0);
        let {price, qty} = products.map(p => ({
            price: p.price.final_price !== undefined ? p.price.final_price : 0, 
            qty: p.qty !== undefined ? p.qty : 0
        }))
        .reduce((q1, q2) => {
            return {
                price:  q1.price + (q2.qty*q2.price),
                qty: q1.qty + q2.qty
            }}, 
            {price: 0, qty: 0}
        );
        const totalprice = price === undefined ? 0 : price;
        const totalqty = qty === undefined ? 0 : qty;
        return (<div className='basket'>
            {!this.state.isExpanded && <div className='mini-basket'>
                {this.props.nextOffer.offer_title !== "" && totalprice > 0 && <span className='dynamic-offer'>{`Add ₹${this.props.nextOffer.basket_difference} to get ${this.props.nextOffer.offer_title}`}</span>}
                <span className='basket-total' onClick={() => {
                    this.setState({ isExpanded: true });
                }}>{`${totalqty} item(s) in Basket`}{totalprice > 0 && ` ₹${totalprice.toLocaleString('en-IN')}`}</span>
                <div className='product-preview-wrapper'>
                    {products.map(p => <ProductItemMini key={`preview-${p.id}`} qty={p.qty} url={p.image}/>)}
                </div>
            </div>}

            {this.state.isExpanded && 
            <div className='basket-maximized-wrapper'>
                <span className='close' onClick={() => {this.setState({ isExpanded: false })}}>x</span>
                <div className='basket-maximized'>
                    <div className='basket-maximized-details'>
                        <h2>Your Basket</h2>
                        <table>
                            <tbody>
                                <tr><td>Item(s)</td><td>{totalqty}</td></tr>
                                <tr><td>Total Cost</td><td>₹{totalprice.toLocaleString('en-IN')}</td></tr>
                            </tbody>
                        </table>
                        <div className='basket-button button' onClick={this.props.emptyBasket}>Empty Basket</div>
                        <div className='basket-button button'>Move all to Wishlist</div>
                    </div>
                    <div className='basket-products-wrapper'>
                        {products.length === 0 && <h3>Uh oh! Your basket looks empty!</h3>}
                        {products.map(p => <ProductItem key={`basket-item-${p.id}`} {...p}/>)}
                    </div>
                </div>
            </div>
            }
        </div>)
    }
}

const mapStateToProps = state => 
({
    products: state.SearchAppReducer.products,
    nextOffer: state.BasketReducer.offer
});

const mapDispatchToProps = {
    emptyBasket: SearchActions.emptyBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);