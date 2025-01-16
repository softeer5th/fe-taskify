import { columnData } from "./fakeColumnListData.js";

export function getAllData() {
    return columnData;
}

export function getCardData(cardId) {
    for (const column of columnData) {
        const card = column.data.find(card => card.cardId === Number(cardId));
        if (card) return card; 
    }
    return null;
}
