const createCategory = (
    identifier,
    categoryName,
    todoList = [],
    todoFormDomId = null
) => {
    return {
        identifier: identifier,
        todoFormDomId: todoFormDomId,
        values: {
            category: categoryName,
            todoList: todoList,
        },
    }
}

export const Category = createCategory
