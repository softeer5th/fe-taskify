import { Action } from '../domain/Action.js'
import { actionTypes } from '../types/actionTypes.js'
import { deepCopy } from './dataUtil.js'

export const makeTodoAddAction = (categoryUid, todoItem) => {
    todoItem = deepCopy(todoItem)
    const data = {
        categoryUid,
        todoItem,
    }
    return Action(actionTypes.todoCreate, '@멋진삼', new Date(), data)
}

export const makeTodoDeleteAction = (categoryUid, todoItem, index) => {
    todoItem = deepCopy(todoItem)
    const data = {
        categoryUid,
        todoItem,
        index,
    }
    return Action(actionTypes.todoDelete, '@멋진삼', new Date(), data)
}

export const makeTodoEditAction = (
    categoryUid,
    prevTodoItem,
    currentTodoItem,
    index
) => {
    prevTodoItem = deepCopy(prevTodoItem)
    currentTodoItem = deepCopy(currentTodoItem)
    const data = {
        categoryUid,
        prevTodoItem,
        currentTodoItem,
        index,
    }
    return Action(actionTypes.todoEdit, '@멋진삼', new Date(), data)
}

export const makeTodoMoveAction = (
    prevCategoryUid,
    currentCategoryUid,
    prevTodoItem,
    currentTodoItem,
    prevIndex,
    currentIndex
) => {
    prevTodoItem = deepCopy(prevTodoItem)
    currentTodoItem = deepCopy(currentTodoItem)
    const data = {
        prevCategoryUid,
        currentCategoryUid,
        prevTodoItem,
        currentTodoItem,
        prevIndex,
        currentIndex,
    }
    return Action(actionTypes.todoMove, '@멋진삼', new Date(), data)
}

export const makeTodoSortAction = (categoryUid) => {
    const data = {
        categoryUid,
    }
    return Action(actionTypes.todoSort, '@멋진삼', new Date(), data)
}
