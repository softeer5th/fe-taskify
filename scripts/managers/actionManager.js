import { Action } from '../domain/Action.js'
import { classNames, keys } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
import { getCategoryByUid } from '../utils/dataUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'
import { undoTodoItemMove } from './dragManager.js'
import {
    undoTodoItemCreate,
    undoTodoItemDelete,
    undoTodoItemEdit,
} from './todoManager.js'

keys.RESET_DATA_KEY && storeData(keys.ACTION_STORAGE_KEY, [])
keys.RESET_DATA_KEY && storeData(keys.ACTION_POINTER_STORAGE_KEY, -1)

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
            console.log('undo create')
            undoTodoItemCreate(category, action.data.todoItem)
            break
        case actionTypes.todoDelete:
            console.log('undo delete')
            undoTodoItemDelete(
                category,
                action.data.todoItem,
                action.data.index
            )
            break
        case actionTypes.todoEdit:
            console.log('undo edit')
            undoTodoItemEdit(
                category,
                action.data.prevTodoItem,
                action.data.currentTodoItem,
                action.data.index
            )
            break
        case actionTypes.todoMove:
            console.log('undo move')
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
