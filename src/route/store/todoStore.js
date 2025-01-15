import { columnData } from "./fakeColumnListData.js";

export function getAllData() {
    return columnData;
}

export function getCardData(cardId) {
    return columnData.findIndex(column =>
        column.data.find(card => card.cardId === cardId)
    );
}