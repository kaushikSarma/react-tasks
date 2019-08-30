export default class CreditCard {
    id?: number = undefined;
    name?: string = '';
    number: string = '';
    expiryMonth: number = 0;
    expiryYear: number = 0;
    type?: string = '';

    constructor({ number = '', expiryMonth = 0, expiryYear = 0, id = -1, name = '', type = ''} = {}) {
        console.log({ number, expiryMonth, expiryYear, id, name, type});
        this.id = id;
        this.number = number;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.name = name;
        this.type = type;
    }
}