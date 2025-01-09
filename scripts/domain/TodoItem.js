const createTodoItem = (identifier, title, content, author) => {
    return {
        identifier: identifier,
        values: {
            // category: category,
            title: title,
            content: content,
            author: author,
        },
    }
}

export const TodoItem = createTodoItem
