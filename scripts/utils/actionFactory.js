import { Action } from '../domain/Action.js'
import { actionTypes } from '../types/actionTypes.js'

export const makeTodoAddAction = (categoryUid, todoItem) => {
    const data = {
        categoryUid,
        todoItem,
    }
    return Action(actionTypes.todoCreate, '@멋진삼', new Date(), data)
}

export const makeTodoDeleteAction = (categoryUid, todoItem) => {
    const data = {
        categoryUid,
        todoItem,
    }
    return Action(actionTypes.todoDelete, '@멋진삼', new Date(), data)
}

export const makeTodoEditAction = (
    categoryUid,
    prevTodoItem,
    currentTodoItem
) => {
    const data = {
        categoryUid,
        prevTodoItem,
        currentTodoItem,
    }
    return Action(actionTypes.todoEdit, '@멋진삼', new Date(), data)
}

export const makeTodoMoveAction = (
    prevCategoryUid,
    currentCategoryUid,
    prevTodoItem,
    currentTodoItem
) => {
    const data = {
        prevCategoryUid,
        currentCategoryUid,
        prevTodoItem,
        currentTodoItem,
    }
    return Action(actionTypes.todoMove, '@멋진삼', new Date(), data)
}

export const makeTodoSortAction = (categoryUid) => {
    const data = {
        categoryUid,
    }
    return Action(actionTypes.todoSort, '@멋진삼', new Date(), data)
}
