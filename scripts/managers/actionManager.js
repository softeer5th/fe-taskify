import { Action } from '../domain/Action'
import { keys } from '../strings'
import { actionTypes } from '../types/actionTypes'
import { loadData, storeData } from '../utils/storageUtil'

let actionList = loadData(keys.ACTION_STORAGE_KEY) ?? []
let pointer = loadData(keys.ACTION_POINTER_STORAGE_KEY) ?? -1

// action이 굉장히 길어지면? 최대 개수 제한하고 circular queue로 구현?
export const addAction = (action) => {
    pointer++
    if (pointer == actionList.length) {
        actionList.push(action)
    } else {
        actionList[pointer] = action
        actionList.splice(pointer + 1)
    }

    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    storeData(keys.ACTION_STORAGE_KEY, actionList)
}

// export const removeAllAction = () => {
//     actionList = []
//     storeData(keys.ACTION_STORAGE_KEY, actionList)
// }

export const undoRecentAction = (callback) => {
    if (pointer < 0) {
        throw Error('No action to undo')
    }
    const action = actionList[pointer]
    pointer--
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    callback(action.actionType, action.data)
}

export const redoRecentAction = (callback) => {
    if (pointer == actionList.length - 1) {
        throw Error('No action to redo')
    }
    pointer++
    const action = actionList[pointer]
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    callback(action.actionType, action.data)
}

export const makeTodoAddAction = (categoryUid, todoIndex) => {
    const data = {
        categoryUid,
        todoIndex,
    }
    return Action(actionTypes.todoCreate, '@멋진삼', new Date(), data)
}

export const makeTodoDeleteAction = (categoryUid, todoIndex) => {
    const data = {
        categoryUid,
        todoIndex,
    }
    return Action(actionTypes.todoDelete, '@멋진삼', new Date(), data)
}

export const makeTodoEditAction = (categoryUid, todoIndex) => {
    const data = {
        categoryUid,
        todoIndex,
    }
    return Action(actionTypes.todoEdit, '@멋진삼', new Date(), data)
}

export const makeTodoMoveAction = (
    prevCategoryUid,
    currentCategoryUid,
    prevTodoIndex,
    currentTodoIndex
) => {
    const data = {
        prevCategoryUid,
        currentCategoryUid,
        prevTodoIndex,
        currentTodoIndex,
    }
    return Action(actionTypes.todoMove, '@멋진삼', new Date(), data)
}

export const makeTodoSortAction = (categoryUid) => {
    const data = {
        categoryUid,
    }
    return Action(actionTypes.todoSort, '@멋진삼', new Date(), data)
}
