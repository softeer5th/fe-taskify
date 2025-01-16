import { generateUid } from '../utils/dataUtil.js'

// TODO: indexing

const createTodoItem = (identifier, title, content, author) => {
    return {
        uid: generateUid(),
        title,
        content,
        author,
    }
}

export const TodoItem = createTodoItem
