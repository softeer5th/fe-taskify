/**
 * @typedef {Object} Column
 * @property {string} title
 * @property {number} contentNum
 * @property {Card[]} cards
 */

/**
 * Create a new column
 * @param {id} id
 * @param {string} title
 * @param {number} contentCount
 * @returns {Column}
 */
const createEmptyColumn = (id, title) => {
    return {
        id,
        title,
        contentCount: 0,
        cumuluativeCount: 0,
        cards: []
    }
};

/**
 * @typedef {Object} Card
 * @property {string} title
 * @property {string} content
 * @property {Date} date
 * @property {string} author
 */

/**
 * Create a new card
 * @returns {User}
 */
export const createCard = () => {
    return {
        title: '',
        content: '',
        date: new Date(),
        author: '박준혁'
    };
}

/**
 * Create a new columns
 * @param {string} title
 * @param {number} contentNum
 * @returns {Column[]}
 */
const createEmptyColumns = (titleArray) => titleArray.map((title, index) => createEmptyColumn(index, title));

/**
 * Create default columns
 * @returns {Column[]}
 */
const createDefaultColumns = () => createEmptyColumns(['해야 할 일', '하고 있는 일', '완료한 일']);

/**
 * Append column to original columns
 * @param {Column[]} columnArray
 * @param {string} title
 * @param {number} contentNum
 * @returns {Column[]}
 */

const appendColumn = (columnArray, id) => [...columnArray, createEmptyColumn(id, title, contentNum)];

const deleteColumn = (columnArray, id) => columnArray.filter(column => column.id !== id);

const editColumn = (columnArray, id, newTitle) => columnArray.map(column => column.id !== id ? column : {
    ...column, title: newTitle
})

const appendCard = (columnArray, columnId, newCard) => {

    const newColumnArray = columnArray.map(column => column.id !== columnId ? column : {
        ...column, cards: [...column.cards, { id: ++column.cumuluativeCount, ...newCard }]
    })
    const newCardId = columnArray.reduce((id, column) => id += column.id === columnId ? column.cumuluativeCount : 0, 0);
    return { newCardId, newColumnArray };
}

const deleteCard = (columnArray, columnId, cardId) => columnArray.map(column => column.id !== columnId ? column :
    { ...column, cards: column.cards.filter(card => card.id+1 === cardId) }
)

const updateCard = (columnArray, columnId, cardId, newCard) => columnArray.map(column => column.id !== columnId ? column :
    { ...column, cards: column.cards.map(card => card.id !== cardId ? card : { ...newCard, id: card.id, date: card.date, }) }
)

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
        createCardData: () => createCard(),
        createCard: (columnId, cardData) => {
            const { newCardId, newColumnArray } = appendCard(columnStorage, columnId, cardData)

            columnStorage = newColumnArray.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount + 1,
                cumuluativeCount: column.cumuluativeCount + 1
            })
            return newCardId;
        },
        deleteCard: (columnId, cardId) => {
            console.log(columnStorage)
            columnStorage = deleteCard(columnStorage, columnId, cardId)
            columnStorage = columnStorage.map(column => column.id !== columnId ? column : {
                ...column,
                contentCount: column.contentCount - 1,
            })
        },
        updateCard: (columnId, cardId, card) => {
            columnStorage = updateCard(columnStorage, columnId, cardId, card)
        }
    }

}