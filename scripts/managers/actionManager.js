import { Action } from '../domain/Action.js'
import { classNames, keys } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
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
    switch (action.type) {
        case actionTypes.todoCreate:
            // todoCreate
            break
        case actionTypes.todoDelete:
            // todoDelete
            break
        case actionTypes.todoEdit:
            // todoEdit
            break
        case actionTypes.todoMove:
            // todoMove
            break
        case actionTypes.todoSort:
            // todoSort
            break
    }

    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
}

const undoTodoItemCreate = (category, todoItem) => {}

const undoTodoItemDelete = (category, todoItem) => {}

const undoTodoItemEdit = (category, prevTodoItem, currentTodoItem) => {}

const undoTodoItemMove = (
    prevCategory,
    currentCategory,
    prevTodoItem,
    currentTodoItem
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
