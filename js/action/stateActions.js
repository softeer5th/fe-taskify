import { columnStore } from "../store/column.js";

const store = columnStore();

export const onAddCard = (columnId, setState) => {
    store.createCard(columnId);
    setState({ columns: store.getColumns() });
}
export const onDeleteCard = (columnId, cardId, setState) => {
    store.deleteCard(columnId, cardId);
    setState({ columns: store.getColumns() });
}

export const onUpdateCard = (columnId, cardId, updatedCard, setState) => {
    store.updateCard(columnId, cardId, updatedCard);
    setState({ columns: store.getColumns() });
}