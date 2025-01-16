
export class ColumnData {

    constructor(name = '', data = []) {
        this.name = name;
        this.data = data;
    }

    getCard(cardId) {
        return this.data.find((d) => d.cardId == cardId);
    }

    addCard(newCard) {
        this.data.push(newCard);
    }

    removeData(cardIndex) {
        this.data = this.data.filter((d, index) => index !== Number(cardIndex));
    }

    removeDataById(cardId) {
        this.data = this.data.filter((d) => d.cardId !== Number(cardId));
    }
}