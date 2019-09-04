import * as React from "react";

import './index.scss';
import { Product } from "@data/Product";

interface ProductItemProps {
    isShimmerObject ?: boolean
    // "title"?: string
}

export default class ProductItem extends React.Component<ProductItemProps & Product> {
    discount = (mrp, final_price) => Math.floor(100*(mrp - final_price)/mrp);
    render = () => {
        if (this.props.isShimmerObject === undefined || !this.props.isShimmerObject) {
            const hasDiscount = this.props.price.mrp !== undefined && !isNaN(this.props.price.mrp);
            const discountPercent = hasDiscount ? this.discount(this.props.price.mrp, this.props.price.final_price) : 0;
            return (
            <div className='product-item'>
                <div className='image-container'>
                <img src={this.props.image} alt="Could not display image!"></img>
                </div>
                <div className='product-desc'>
                    <p className='product-title'>{this.props.title}</p>
                    <div className='rating-row'>
                        <span className="color-display-bubble" style={{background: this.props.colour.color}}></span><label>{this.props.colour.title}</label>
                        { this.props.rating !== undefined && this.props.rating !== 0 && <span className='rating-badge'>{this.props.rating} &#9734;</span> }
                    </div>
                    <p>
                        <span className='price-final'>&#8377;{this.props.price.final_price}</span>
                    { hasDiscount && <span className='price-mrp'>&#8377;{this.props.price.mrp}</span> }
                    { hasDiscount && <span className='price-discount'>{discountPercent}&#37; off</span>}
                    </p>
                </div>
            </div>)
        } else {
            return <div className='product-item shimmer'>
                <div className='image-container'>
                <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="Could not display image!"></img>
                </div>
                <div className='product-desc'>
                    <p className='product-title'></p>
                    <div className='rating-row'></div>
                    <p>
                        <span className='price-final'></span>
                    </p>
                </div>
            </div>
        }
    }
}