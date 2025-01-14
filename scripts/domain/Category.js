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
            categoryName: categoryName,
            todoList: todoList,
        },
    }
}

export const Category = createCategory
