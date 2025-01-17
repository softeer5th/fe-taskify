import { columnData } from "./fakeColumnListData.js";
import { sortType } from "../data/sortType.js";

class TodoStore {

    constructor() {
        this.columnData = columnData;
    }

    getAllData() {
        return this.columnData;
    }

    getCardData(cardId) {
        for (const column of this.columnData) {
            const card = column.data.find(card => card.cardId === Number(cardId));
            if (card) return card;
        }
        return null;
    }

    addCard(columnIndex, newCardData) {
        this.columnData = this.columnData.map((column, index) => {
            if (index === columnIndex) {
                return {
                    ...column,
                    data: [...(column.data || []), newCardData],
                };
            }
            return column;
        });
    }

    editCard(columnIndex, cardIndex, newCardData) {
        this.columnData = this.columnData.map((column, index) => {
            if (index !== columnIndex) return column;

            return {
                ...column,
                data: column.data.map((card, idx) => {
                    if (idx !== cardIndex) return card;
                    return newCardData;
                }),
            };
        });
    }

    removeCard(columnIndex, cardIndex) {
        this.columnData = this.columnData.map((column, index) => {
            if (index !== columnIndex) return column;

            return {
                ...column,
                data: column.data.filter((_, idx) => idx !== cardIndex),
            };
        });
    }

    removeCardById(cardId) {
        this.columnData = this.columnData.map((column) => {
            return {
                ...column,
                data: column.data.filter((card) => card.cardId !== Number(cardId))
            };
        });
    }

    sort(type) {
        if (type === sortType.create) {
            this.sortByCreated();
        } else {
            this.sortByRecent();
        }
    }

    sortByCreated() {
        this.columnData = this.columnData.map((column) => {
            return {
                ...column,
                data: [...(column.data || [])].sort((card1, card2) => card1.cardId - card2.cardId),
            };
        });
    }

    sortByRecent() {
        this.columnData = this.columnData.map((column) => {
            return {
                ...column,
                data: [...(column.data || [])].sort((card1, card2) => card2.cardId - card1.cardId),
            };
        });
    }
}

export const todoStore = new TodoStore();