import { generateUid } from '../utils/dataUtil.js'

const createCategory = (categoryName, todoList = []) => {
    return {
        uid: generateUid(),
        categoryName,
        todoList,
    }
}

export const Category = createCategory
