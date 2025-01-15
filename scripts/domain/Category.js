import { generateUid } from '../utils/dataManager.js'

const createCategory = (identifier, categoryName, todoList = []) => {
    return {
        identifier,
        values: {
            uid: generateUid(),
            categoryName,
            todoList,
        },
    }
}

export const Category = createCategory
