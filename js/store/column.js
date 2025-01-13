import { cardActions } from "../action/cardActions.js";
import { columnActions } from "../action/columnActions.js";

const {
    createDefaultColumns,
    appendColumn,
    deleteColumn,
    editColumn
} = columnActions;

const {
    createCard,
    updateCard,
    deleteCard,
    appendCard
} = cardActions;

let columnStoreIndex = 2;
let columnStorage = createDefaultColumns();

export const columnStore = () => {
    return {
        createNewColumn: () => {
            columnStorage = appendColumn(columnStorage, ++columnStoreIndex);
            columnStoreIndex++;
            return columnStoreIndex;
        },
        deleteColumn: (id) => {
            columnStorage = deleteColumn(columnStorage, id);
            columnStoreIndex--;
        },
        getColumns: () => columnStorage,
        getColumnWithId: (id) => columnStorage.find(column => column.id === id),
        getNumberOfCards: (columnId) => columnStorage.find(column => column.id === columnId).cards.length,
        getCardWithId: (columnId, cardId) => {
            const column = columnStorage.find(column => column.id === columnId);
            if (!column) return null;
            console.log(column)
            return column.cards.find(card => card.id === cardId) || null;
        },
        updateColumn: (id, title) => editColumn(columnStorage, id, title),
        createCard: (columnId) => {
            const { newColumnArray } = appendCard(columnStorage, columnId, createCard())

            columnStorage = newColumnArray.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount + 1,
                cumuluativeCount: column.cumuluativeCount + 1
            })
        },
        deleteCard: (columnId, cardId) => {
            console.log(columnStorage)
            columnStorage = deleteCard(columnStorage, columnId, cardId)
            columnStorage = columnStorage.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount - 1,
            })
        },
        updateCard: (columnId, cardId, cardData) => {
            columnStorage = updateCard(columnStorage, columnId, cardId, cardData)
        }
    }

}