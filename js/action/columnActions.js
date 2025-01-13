const createEmptyColumn = (id, title) => {
    return {
        id,
        title,
        contentCount: 0,
        cumuluativeCount: 0,
        cards: []
    }
};

const createEmptyColumns = (titleArray) => titleArray.map((title, index) => createEmptyColumn(index, title));

const createDefaultColumns = () => createEmptyColumns(['해야 할 일', '하고 있는 일', '완료한 일']);

const appendColumn = (columnArray, id) => [...columnArray, createEmptyColumn(id, title, contentNum)];

const deleteColumn = (columnArray, id) => columnArray.filter(column => column.id !== id);

const editColumn = (columnArray, id, newTitle) => columnArray.map(column => column.id !== id ? column : {
    ...column, title: newTitle
})

export const columnActions = {
    createDefaultColumns,
    appendColumn,
    deleteColumn,
    editColumn
}