import * as React from 'react';
import './index.scss';
import CreditCard from '@data/CreditCard';
import CreditCardItem from '@component/CreditCardItem';
import CreditCardForm from '@component/CreditCardForm';

interface CardsPageState {
    AddNew: boolean;
    EditCard: boolean;
    CurrentEditId: number;
}

interface CardsPageProps {
    cards: CreditCard[];
    validation: {};
}

interface CardsPageHandlers {
    addCreditCardHandler(data: CreditCard);
    removeCreditCardById(id: number);
    editCreditCard(data: CreditCard);
}

export default class CardsPage extends React.Component<CardsPageProps & CardsPageHandlers, CardsPageState> {
    constructor(props) {
        super(props);
        this.state = {
            AddNew: false,
            EditCard: false,
            CurrentEditId: undefined
        }
    }

    componentDidUpdate = () => {
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
        this.props.addCreditCardHandler(data);
    }
    removeCreditCardById = (id: number) => {
        this.props.removeCreditCardById(id);
    }
    editCard = (data: CreditCard) => {
        this.setState({
            EditCard: false,
            CurrentEditId: undefined
        })
        this.props.editCreditCard(data);
    }
    render = () => {
        console.log(this.props.cards);
        return (
            <div className='cc-content'>
                <h4>Manage Credit Cards</h4>
                {!this.state.AddNew && <div className="card AddNewButton" 
                                        onClick={() => {
                                            this.cancelEditCard();
                                            this.setState({ AddNew: true })
                                        }}>
                                            <span className="icon">+</span>Add Card
                                        </div>}

                {this.state.AddNew && <CreditCardForm validations={this.props.validation} submitCard={this.addNewCard} cancel={this.cancelAddCard} />}
                <ul>
                    {this.props.cards.map((cardData,index) => { 
                        if (this.state.EditCard && cardData.id === this.state.CurrentEditId) return <CreditCardForm key={`form-${index}`} validations={this.props.validation} currentCardDetails={cardData} submitCard={this.editCard} cancel={this.cancelEditCard} />;
                        return <CreditCardItem key={`ccitem-${index + 1}`} index={index + 1} editCard={() => {this.cancelAddCard(); this.setState({ EditCard: true, CurrentEditId: cardData.id })}} removeCard={this.removeCreditCardById} {...cardData}/>})}
                </ul>
            </div>
        )
    }
}