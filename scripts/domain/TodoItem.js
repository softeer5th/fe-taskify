// TODO: indexing

const createTodoItem = (identifier, title, content, author) => {
    return {
        identifier: identifier,
        values: {
            title: title,
            content: content,
            author: author,
        },
    }
}

export const TodoItem = createTodoItem
