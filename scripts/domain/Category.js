import { generateUid } from '../utils/dataUtil.js'

const createCategory = (identifier, categoryName, todoList = []) => {
    return {
        uid: generateUid(),
        categoryName,
        todoList,
    }
}

export const Category = createCategory
