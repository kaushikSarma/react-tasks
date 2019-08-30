import * as React from 'react';

import './index.scss';
import { number } from 'prop-types';

interface CreditCardItemProps {
    id?: number;
    name?: string;
    number: string;
    expiryMonth: number;
    expiryYear: number;
    type?: string,
    index: number
}

interface CreditCardItemFunctions {
    removeCard(id);
    editCard(data);
}

export default class CreditCardItem extends React.Component<CreditCardItemProps & CreditCardItemFunctions> {
    removeCard = () => {
        this.props.removeCard(this.props.id);
    }
    editCard = () => {
        this.props.editCard(this.props.id);
    }
    
    render = () => {
        let numbertodisplay = this.props.number.replace(/([0-9]{3,4})/g, (matched, p, offset) => {
            console.log('matching', matched, offset);
            if (offset === 4) matched = matched.substr(2) + '**';
            if (offset === 8) matched = matched.replace(/\d/g, '*');
            return matched + ' - ';
        });
        numbertodisplay = numbertodisplay.slice(0, -3);
        return (<div className='card cardItem'>
            <span className='deleteItem' onClick={this.removeCard}>remove</span>
            <h3>{this.props.name === undefined || this.props.name === "" ? "Card " + this.props.index : this.props.name} <span  onClick={this.editCard} className='editItem'>edit</span></h3>
            <div className='cardDetails'><span className={"icon-" + this.props.type.toLowerCase()}>{this.props.type}</span> {numbertodisplay}</div>
        </div>)
    }
}