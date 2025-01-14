
let cardId = 1;

export class CardData {

    constructor(title = '', body = '', author = '') {
        this.title = title;
        this.body = body;
        this.author = author;
        this.cardId = cardId;
        cardId++;
    }

}