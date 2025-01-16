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
    appendCard,
    appendCardOnIndex,
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
        getColumnInfo: () => columnStorage.map(column => {
            const { id, title, contentCount } = column;
            return { id, title, contentCount };
        }),
        getColumnWithId: (id) => columnStorage.find(column => column.id === id),
        getNumberOfCards: (columnId) => columnStorage.find(column => column.id === columnId).cards.filter(card => card.readOnly === true).length,
        getCardWithId: (columnId, cardId) => {
            const column = columnStorage.find(column => column.id === columnId);
            if (!column) return null;
            console.log(column)
            return column.cards.find(card => card.id === cardId) || null;
        },
        updateColumn: (id, title) => editColumn(columnStorage, id, title),
        createCard: (columnId) => {
            // 추가는 오직 하나만 되게 제한
            const cards = columnStorage.find(column => column.id === columnId).cards;
            const hasReadOnlyCards = cards.find(card => card.readOnly === false);

            if (hasReadOnlyCards) return;
            const { newColumnArray } = appendCard(columnStorage, columnId, createCard())

            columnStorage = newColumnArray.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount + 1,
                cumuluativeCount: column.cumuluativeCount + 1
            })
        },
        deleteCard: (columnId, cardId) => {
            columnStorage = deleteCard(columnStorage, columnId, cardId)
            columnStorage = columnStorage.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount - 1,
            })
        },
        updateCard: (columnId, cardId, cardData) => {
            columnStorage = updateCard(columnStorage, columnId, cardId, cardData)
        },
        changeCardOnIndex: (columnId, cardId, index) => {
            const column = columnStorage.find(column => column.id === columnId);
            const card = column.cards.find(card => card.id === cardId);
            columnStorage = deleteCard(columnStorage, columnId, cardId)
            const { newColumnArray } = appendCardOnIndex(columnStorage, columnId, card, index);
            columnStorage = newColumnArray;
        },
        moveCard: (fromColumnId, toColumnId, cardId, index) => {
            const column = columnStorage.find(column => column.id === fromColumnId);
            const card = column.cards.find(card => card.id === cardId);
            columnStorage = deleteCard(columnStorage, fromColumnId, cardId);
            const { newColumnArray } = appendCardOnIndex(columnStorage, toColumnId, card, index);

            columnStorage = newColumnArray.map(column => {
                if (column.id !== toColumnId && column.id !== fromColumnId) return column;
                if (column.id === toColumnId) return {
                    ...column,
                    contentCount: column.contentCount + 1,
                    cumuluativeCount: column.cumuluativeCount + 1
                }
                if (column.id === fromColumnId) return {
                    ...column,
                    contentCount: column.contentCount - 1,
                }
            })

            console.log(columnStorage)
        }
    }

}