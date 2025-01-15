import { generateUid } from '../utils/dataManager.js'

// TODO: indexing

const createTodoItem = (identifier, title, content, author) => {
    return {
        identifier,
        values: {
            uid: generateUid(),
            title,
            content,
            author,
        },
    }
}

export const TodoItem = createTodoItem
