import * as React from 'react';
import './index.scss';
import CreditCard from '@data/CreditCard';
import CreditCardItem from '@component/CreditCardItem';
import CreditCardForm from '@component/CreditCardForm';

import { connect } from 'react-redux';
import { CONST_URLS, CONST_STORAGE } from '@data/Constants';

import * as CardActions from '@action/CardActions';

interface CardsPageProps {
    validation: {}
    cards: {
        id?: number;
        name?: string;
        number: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        type?: string;
    }[]
}

interface CardsPageEventHandlers {
    addCard(data);
    removeCard(id);
    editCard(data);
}

interface CardsPageState {
    AddNew: boolean;
    EditCard: boolean;
    CurrentEditId: number;
}

class CardsPage extends React.Component <CardsPageProps & CardsPageEventHandlers, CardsPageState> {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            AddNew: false,
            EditCard: false,
            CurrentEditId: undefined
        }
    }

    componentDidMount = () => {
        fetch(CONST_URLS.CCVLAIDATION_URL).then(response => {
            if (response.status !== 200) {
                console.log("Could not load credit card validations config!");
                return;
            }
            let CcCacheState = JSON.parse(window.localStorage.getItem(CONST_STORAGE.CC_STORAGE));
            if (CcCacheState !== null && CcCacheState.savedCards !== undefined) {
                this.props['readCache'](CcCacheState);
            }
            response.json().then(data => {
                this.props['updateCache'](data)
            });
        });
    }

    cancelAddCard = () => {
        this.setState({
            AddNew: false
        });
    }
    cancelEditCard = () => {
        this.setState({
            EditCard: false,
            CurrentEditId: undefined
        })
    }
    // Function to add new credit card
    addNewCard = (data: CreditCard) => {
        this.setState({
            AddNew: false
        })
        this.props.addCard(data);
    }
    removeCreditCardById = (id: number) => {
        this.props.removeCard(id);
    }
    editCard = (data: CreditCard) => {
        this.setState({
            EditCard: false,
            CurrentEditId: undefined
        })
        this.props.editCard(data);
    }

    render = () => {
        return (
            <div className='cc-content'>
                <h4>Manage Credit Cards</h4>
                {!this.state['AddNew'] && <div className="card AddNewButton" 
                                        onClick={() => {
                                            this.cancelEditCard();
                                            this.setState({ AddNew: true })
                                        }}>
                                            <span className="icon">+</span>Add Card
                                        </div>}

                {this.state['AddNew'] && <CreditCardForm validations={this.props.validation} submitCard={this.addNewCard} cancel={this.cancelAddCard} />}
                <ul>
                    {this.props.cards.map((cardData,index) => { 
                        if (this.state['EditCard'] && cardData.id === this.state['CurrentEditId']) return <CreditCardForm key={`form-${index}`} validations={this.props.validation} currentCardDetails={cardData} submitCard={this.editCard} cancel={this.cancelEditCard} />;
                        return <CreditCardItem key={`ccitem-${index + 1}`} index={index + 1} editCard={() => {this.cancelAddCard(); this.setState({ EditCard: true, CurrentEditId: cardData.id })}} removeCard={this.removeCreditCardById} {...cardData}/>})}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reducerState: state['CreditCardsAppReducer'],
    cards: state['CreditCardsAppReducer']['savedCards']['cards'],
    validation: state['CreditCardsAppReducer']['validation'],
});

const mapDispatchToProps = (dispatch) => ({
    readCache: CcCacheState => dispatch(CardActions.readCache(CcCacheState)),
    updateCache: data => dispatch(CardActions.updateCache(data)),
    addCard: data => dispatch(CardActions.addCard(data)),
    removeCard: cardid => dispatch(CardActions.removeCard(cardid)),
    editCard: cardData => dispatch(CardActions.editCard(cardData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
