const createCard = () => {
    return {
        title: '',
        content: '',
        date: new Date(),
        author: '박준혁',
        readOnly: false,
    };
}

const appendCard = (columnArray, columnId, newCard) => {

    const newColumnArray = columnArray.map(column => column.id !== columnId ? column : {
        ...column, cards: [...column.cards, { id: column.cumuluativeCount, ...newCard }]
    })
    return { newColumnArray };
}

const appendCardOnIndex = (columnArray, columnId, newCard, index) => {
    const newColumnArray = columnArray.map(column => column.id !== columnId ? column : {
        ...column, cards: [...column.cards.slice(0, index), { ...newCard, id: column.cumuluativeCount, }, ...column.cards.slice(index)]
    })
    return { newColumnArray };
}

const deleteCard = (columnArray, columnId, cardId) => columnArray.map(column => column.id !== columnId ? column :
    { ...column, cards: column.cards.filter(card => card.id !== cardId) }
)

const updateCard = (columnArray, columnId, cardId, newCardData) => columnArray.map(column => column.id !== columnId ? column :
    { ...column, cards: column.cards.map(card => card.id !== cardId ? card : { ...newCardData, id: card.id, date: card.date }) }
)

export const cardActions = {
    createCard,
    appendCard,
    deleteCard,
    updateCard,
    appendCardOnIndex
}

