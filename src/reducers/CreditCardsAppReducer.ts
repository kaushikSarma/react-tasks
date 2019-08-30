import CreditCard from "@data/CreditCard";
import CreditCardList from "@data/CreditCardList";

// Section containing reducer and state for Credit Cards
class CreditCardsAppState {
    savedCards: CreditCardList;
    validation: {};
    constructor(cards: CreditCardList = new CreditCardList(), validation: {} = {}) {
        this.savedCards = cards; 
        this.validation = validation;
    }
}

export const CreditCardsAppReducer = (state: CreditCardsAppState = new CreditCardsAppState(
    new CreditCardList(0), {} 
), action) => {
    switch(action.type) {
        case 'READ_CC_CACHE': {
            console.log('data from cache', action.savedCards);
            const newstate = new CreditCardsAppState(new CreditCardList(action.savedCurrentID,
                                ...action.savedCards), action.savedValidation);
            return newstate;
        }
        case 'ADD_CARD': {
            console.log(action.cardData);
            const newstate = new CreditCardsAppState(new CreditCardList(state.savedCards.getCurrentCardID(),
                                ...state.savedCards.getCards(),
                                new CreditCard(
                                    action.cardData
                                )), state.validation)
            return newstate;
        }
        case 'REMOVE_CARD': {
            console.log(action.cardID);
            const newstate = new CreditCardsAppState(new CreditCardList(state.savedCards.getCurrentCardID(), 
                                ...state.savedCards.getCards().filter(card => card.id !== action.cardID)), state.validation);
            return newstate;
        }
        case 'EDIT_CARD': {
            console.log(action.cardData);
            // check if card exists and retrieve index
            let index = state.savedCards.getCards().findIndex(card => card.id === action.cardData.id);
            console.log(index);
            if (index !== -1) {
                let cards = state.savedCards.getCards();
                cards[index] = new CreditCard(action.cardData);
                let updateList = new CreditCardList(state.savedCards.getCurrentCardID(), ...cards);
                const newstate = new CreditCardsAppState(updateList, state.validation);
                return newstate;
            } else return state;
        }
        case 'UPDATE_CC_CONFIG': {
            const newstate = new CreditCardsAppState(state.savedCards, action.configdata);
            console.log('Updating Credit card data with ', newstate);
            return newstate;
        }
        default: return state;
    }
}