import { classNames, keys } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
import ActionQueue from '../utils/ActionQueue.js'
import { getCategoryByUid } from '../utils/dataUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'
import { redoTodoItemMove, undoTodoItemMove } from './dragManager.js'
import {
    redoTodoItemCreate,
    redoTodoItemDelete,
    redoTodoItemEdit,
    undoTodoItemCreate,
    undoTodoItemDelete,
    undoTodoItemEdit,
} from './todoManager.js'

// 실제 원하는 size에 +1 해줘야 함
const UNDO_QUEUE_MAX_LENGTH = 6

keys.RESET_DATA_KEY && storeData(keys.ACTION_STORAGE_KEY, null)

const { front, current, rear, queue } = loadData(keys.ACTION_STORAGE_KEY) ?? {
    front: 0,
    current: 0,
    rear: 0,
    queue: new Array(UNDO_QUEUE_MAX_LENGTH),
}
const actionQueue = new ActionQueue(
    UNDO_QUEUE_MAX_LENGTH,
    front,
    current,
    rear,
    queue
)

export const addAction = (action) => {
    actionQueue.addAction(action)
    storeData(keys.ACTION_STORAGE_KEY, actionQueue)
}

export const initUndoButton = () => {
    const undoButtonElement = document.querySelector(
        `.${classNames.undoButton}`
    )
    undoButtonElement.addEventListener('click', () => {
        handleUndo()
    })
}

export const initRedoButton = () => {
    const redoButtonElement = document.querySelector(
        `.${classNames.redoButton}`
    )
    redoButtonElement.addEventListener('click', () => {
        handleRedo()
    })
}

const handleUndo = () => {
    const action = actionQueue.undo()
    if (action === null) {
        throw Error('No action to undo')
    }
    undoAction(action)
    storeData(keys.ACTION_STORAGE_KEY, actionQueue)
}

const handleRedo = () => {
    const action = actionQueue.redo()
    if (action === null) {
        throw Error('No action to redo')
    }
    redoAction(action)
    storeData(keys.ACTION_STORAGE_KEY, actionQueue)
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
            undoTodoItemDelete(
                category,
                action.data.todoItem,
                action.data.index
            )
            break
        case actionTypes.todoEdit:
            undoTodoItemEdit(
                category,
                action.data.prevTodoItem,
                action.data.currentTodoItem,
                action.data.index
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
}

const redoAction = (action) => {
    const category = getCategoryByUid(action.data.categoryUid)
    const prevCategory = getCategoryByUid(action.data.prevCategoryUid) ?? null
    const currentCategory =
        getCategoryByUid(action.data.currentCategoryUid) ?? null

    switch (action.type) {
        case actionTypes.todoCreate:
            redoTodoItemCreate(category, action.data.todoItem)
            break
        case actionTypes.todoDelete:
            redoTodoItemDelete(
                category,
                action.data.todoItem,
                action.data.index
            )
            break
        case actionTypes.todoEdit:
            redoTodoItemEdit(
                category,
                action.data.prevTodoItem,
                action.data.currentTodoItem,
                action.data.index
            )
            break
        case actionTypes.todoMove:
            redoTodoItemMove(
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
}

const undoTodoItemSort = (category) => {}

export const redoRecentAction = (callback) => {
    if (pointer == actionQueue.length - 1) {
        throw Error('No action to redo')
    }
    pointer++
    const action = actionQueue[pointer]
    callback(action.actionType, action.data)
}
