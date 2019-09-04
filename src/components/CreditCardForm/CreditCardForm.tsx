import * as React from  'react';
import FormRow from './FormRow';
import CreditCard from '@data/CreditCard';

import './index.scss';

interface CreditCardFormProps {
    cancel();
    submitCard(data: CreditCard);
    currentCardDetails?:CreditCard;
    validations: {};
}

interface FormState {
    id?: number;
    name?: string;
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    type?: string;
    numberError: string;
    cvvError: string;
    dateError: string;
}

export default class CreditCardForm extends React.Component<CreditCardFormProps, FormState> {
    constructor(props) {
        super(props);
        const isAddMode = (this.props.currentCardDetails === undefined);
        this.state = {
            id: isAddMode ? undefined : this.props.currentCardDetails.id,
            name: isAddMode ? "" : (this.props.currentCardDetails.name === undefined ? "" : this.props.currentCardDetails.name),
            number: isAddMode ? "" : this.props.currentCardDetails.number,
            expiryMonth: isAddMode ? 0 : this.props.currentCardDetails.expiryMonth,
            expiryYear: isAddMode ? 0 : this.props.currentCardDetails.expiryYear,
            cvv: "",
            type: isAddMode ? "" : this.props.currentCardDetails.type,
            numberError: "",
            cvvError: "",
            dateError: ""
        }
    }

    cancel = () => {
        this.props.cancel();
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        switch(name) {
            case 'name': this.setState({ name: value }); break;
            case 'number':
                if(value !== '' && value.match(/^\d+$/) === null) {
                    value = this.state.number;
                } else this.setState({ number: value, type: '' }, this.checkValidityConfig ); 
                break;
            case 'expiryMonth': this.setState({ expiryMonth: isNaN(parseInt(value)) ? 0 : parseInt(value) }); break;
            case 'expiryYear': this.setState({ expiryYear: isNaN(parseInt(value)) ? 0 : parseInt(value) }); break;
            case 'cvv': 
                if(value !== '' && isNaN(parseInt(value.substr(-1)))) {
                    value = this.state.cvv;
                    console.log('Invalid char');
                    this.setState({
                        cvvError: 'Invalid character input!'
                    })
                } else if (value.length > this.state.cvv.length && this.state.type !== "" && this.state.cvv.length === Object.values(this.props.validations).find(c => c['displayText'] === this.state.type)['cvvLength']) {
                    console.log("CVV length", Object.values(this.props.validations).find(c => c['displayText'] === this.state.type)['cvvLength'])
                    value = this.state.cvv;
                    console.log('Length reached');

                    this.setState({
                        cvvError: 'Already reached required length'
                    })
                } 
                else {
                    this.setState({ cvv: value , cvvError: ''}, this.checkValidityConfig );
                } 
                break;
            default: break;
        }

        
    }


    checkValidityConfig():{
        isvalid: boolean, type: string, error?: string
    } {
        let card = "";
        for (var key in this.props.validations) {
            let cardtype = this.props.validations[key];
            card = "";
            // card validation
            const pattern = new RegExp(cardtype['cardPattern'].slice(1, -1));
            if (this.state.number.match(pattern) === null) {
                if (this.state.type === "" && this.state.number.length > 0) {
                    this.setState({
                        numberError: "Not a valid Card Number"
                    })
                } else if (this.state.number === "") {
                    this.setState({
                        numberError: ""
                    })
                }
                continue;
            }

            console.log('Pattern matched for ', cardtype['displayText']);
            if (this.state.number.length !== cardtype['cardNumberLength']) continue;
            card = cardtype['displayText'];
            this.setState({
                type: card
            }, () => {
                this.setState({
                    numberError: ""
                })
            })
            console.log('Card type might be ', card);
            // card cvv validation
            if (cardtype['cvv'] === 'required' && this.state.cvv.length !== cardtype['cvvLength']) continue;
            console.log('cvv optional', cardtype, (cardtype['cvv'] === 'optional' && this.state.cvv.length > 0 && this.state.cvv.length !== cardtype['cvvLength']));
            if (cardtype['cvv'] === 'optional' && this.state.cvv.length > 0 && this.state.cvv.length !== cardtype['cvvLength']) continue;
            console.log('optional done');
            return {
                isvalid: true, type: card
            }
        }
        return { isvalid: false, type: '', error: 'Invalid input' };
    }

    checkDateValidity() {
        if(this.state.expiryMonth < 1 || this.state.expiryMonth > 12)   return false;
        let currentYear = parseInt((new Date()).getFullYear().toString().substr(-2));
        let currentMonth = (new Date()).getMonth() + 1;
        if(this.state.expiryYear < 0 || this.state.expiryYear < currentYear) return false;
        if(this.state.expiryYear === currentYear && this.state.expiryMonth <= currentMonth) return false;
        return true;
    }

    submitCard = (event) => {
        event.preventDefault();
        console.log(this.state);
        if(this.checkValidityConfig().isvalid) {
            if(this.checkDateValidity()) {
                let tosend = {...this.state};
                delete tosend.cvv;
                delete tosend.numberError;
                delete tosend.cvvError;
                delete tosend.dateError;
                this.props.submitCard(tosend);
                this.setState({
                    id: undefined,
                    name: "",
                    number: "",
                    expiryMonth: 0,
                    expiryYear: 0,
                    cvv: "",
                    type: "",
                    numberError: "",
                    cvvError: "",
                    dateError: ""
                });
            } else {
                alert('Invalid Date!')
            }
        } else {
            alert('Please check Card Number and CVV!');
        }
    }

    render = () => {
        let currentYear = parseInt((new Date()).getFullYear().toString().substr(-2));
        const isAddMode = (this.props.currentCardDetails === undefined);

        return (
            <form className='card' onSubmit={this.submitCard}>
                <header>{ isAddMode ? "Add A New Card" : "Update Credit Card"}</header>
                <FormRow>
                    <div className='inputField'>
                        <input onChange={this.handleChange} name="number" type="text" pattern="\d+" placeholder="Card number" maxLength={50} value={this.state['number']} required/>
                        { this.state.type === "" ? null : <span className={`icon-${this.state.type.toLowerCase()}`}>{this.state.type}</span>}
                        { this.state.numberError === "" ? null : <p className="errorDialog">{this.state.numberError}</p>}
                    </div>
                    <div className='inputField dateField'>
                        <label>Expiry</label>
                        <select onChange={this.handleChange} name="expiryMonth" className="date-month" placeholder="MM" value={this.state['expiryMonth']} required>
                            <option value={0} disabled>MM</option>
                            { Array.from(Array(12), (x, index) => index + 1).map(num => <option key={num} value={num + 1}>{ num < 10 ? '0' + num : '' + num }</option>) }
                        </select>
                        <input onChange={this.handleChange} name="expiryYear" type="number" placeholder="YY" min={currentYear} value={this.state['expiryYear']} required></input>
                        { this.state.dateError === "" ? null : <p className="errorDialog">{this.state.dateError}</p>}
                    </div>
                </FormRow>
                <FormRow>
                    <div className='inputField'>
                        <input onChange={this.handleChange} name="cvv" type="password" placeholder="CVV" maxLength={10} value={this.state['cvv']}/>
                        { this.state.cvvError === "" ? null : <p className="errorDialog">{this.state.cvvError}</p>}
                    </div>
                    <div className='inputField'>
                        <input onChange={this.handleChange} name="name" type="text" placeholder="Name this Card for future use" value={this.state['name']}/>
                    </div>
                </FormRow>
                <FormRow>
                    <div className='inputField'>
                        <button type="submit" className='primary'>{isAddMode ? <b>Save</b> : <b>Update</b>} this card</button>
                        <button type="button" className='nobackground' onClick={this.cancel}>Cancel</button>
                    </div>
                </FormRow>
                <p className='footer'><b className='highlight'>*</b> Your card details will be securely stored for faster payments. Your CVV will not be stored</p>
            </form>
        )
    }
}