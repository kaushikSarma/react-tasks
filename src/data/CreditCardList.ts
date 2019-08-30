import CreditCard from "./CreditCard";

export default class CreditCardList {
    private cards: CreditCard[];
    private currentCardID: number = 0;

    constructor(currentCardID:number = 0, ...cards: CreditCard[]) {
        this.cards = cards;
        this.currentCardID = currentCardID;

        this.cards.map(card => {
            if (card.id === undefined || card.id === -1) {
                card.id = this.currentCardID + 1;
                this.currentCardID = card.id;
            } else {
                this.currentCardID = card.id > this.currentCardID ? card.id : this.currentCardID;
            }
        });
    }

    getCards = () => this.cards;
    addCard = (card: CreditCard) => {
        const lastID = this.currentCardID + 1;
        const lastIndex = this.cards.length;
        this.cards[lastIndex].id = lastID;
        this.cards.push(card);
    }
    deleteCard = (cardID: number) => {
        this.cards = this.cards.filter(card => card.id !== cardID);
    }
    updateCard = (index, data: CreditCard) => {
        this.cards[index] = data;
    }
    getCurrentCardID = () => this.currentCardID;
}