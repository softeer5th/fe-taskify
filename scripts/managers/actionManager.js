import { Action } from '../domain/Action.js'
import { classNames, keys } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
import { getCategoryByUid } from '../utils/dataUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'

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

export const initUndoButton = () => {
    const undoButtonElement = document.querySelector(
        `.${classNames.undoButton}`
    )
    undoButtonElement.addEventListener('click', () => {
        handleUndo()
    })
}

const initRedoButton = () => {}

export const handleUndo = () => {
    if (pointer < 0) {
        throw Error('No action to undo')
    }
    const action = actionList[pointer]
    pointer--
    undoAction(action)
}

const undoAction = (action) => {
    const category = getCategoryByUid(action.data.categoryUid)
    const prevCategory = getCategoryByUid(action.data.prevCategoryUid) ?? null
    const currentCategory =
        getCategoryByUid(action.data.currentCategoryUid) ?? null

    switch (action.type) {
        case actionTypes.todoCreate:
            undoTodoItemCreate(category, action.data.todoItem)
            break
        case actionTypes.todoDelete:
            undoTodoItemDelete(category, action.data.todoItem, index)
            break
        case actionTypes.todoEdit:
            undoTodoItemEdit(
                category,
                action.data.prevTodoItem,
                action.data.currentTodoItem,
                index
            )
            break
        case actionTypes.todoMove:
            undoTodoItemMove(
                prevCategory,
                currentCategory,
                action.data.prevTodoItem,
                action.data.currentTodoItem,
                action.data.prevIndex,
                action.data.currentIndex
            )
            break
        case actionTypes.todoSort:
            break
    }

    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
}

const undoTodoItemCreate = (category, todoItem) => {
    const currentTodoItem = {}
}

const undoTodoItemDelete = (category, todoItem, index) => {}

const undoTodoItemEdit = (category, prevTodoItem, currentTodoItem, index) => {}

const undoTodoItemMove = (
    prevCategory,
    currentCategory,
    prevTodoItem,
    currentTodoItem,
    prevIndex,
    currentIndex
) => {}

const undoTodoItemSort = (category) => {}

export const redoRecentAction = (callback) => {
    if (pointer == actionList.length - 1) {
        throw Error('No action to redo')
    }
    pointer++
    const action = actionList[pointer]
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    callback(action.actionType, action.data)
}
