import { keys } from '../strings.js'
import { getState } from './stateUtil.js'
import { loadData, storeData } from './storageUtil.js'

var lastUid = loadData(keys.LAST_UID_KEY) ?? 0

export const generateUid = () => {
    lastUid++
    storeData(keys.LAST_UID_KEY, lastUid)
    return lastUid
}

export const getCategoryByUid = (categoryUid) => {
    if (!categoryUid) return null
    return getState(keys.TODO_CATEGORY_KEY).find(
        (category) => category.uid === categoryUid
    )
}

export const getTodoItemInfoByUid = (todoItemUid) => {
    const categoryList = getState(keys.TODO_CATEGORY_KEY)
    for (let category of categoryList) {
        for (let [idx, todo] of category.todoList.entries()) {
            if (todo.uid === todoItemUid) {
                return { category: category, index: idx, todoItem: todo }
            }
        }
    }
    return null
}

export const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data))
}
