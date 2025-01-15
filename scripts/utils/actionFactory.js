import { Action } from '../domain/Action.js'
import { actionTypes } from '../types/actionTypes.js'

export const makeTodoAddAction = (category, todoItem) => {
    const data = {
        category,
        todoItem,
    }
    return Action(actionTypes.todoCreate, '@멋진삼', new Date(), data)
}

export const makeTodoDeleteAction = (category, todoItem) => {
    const data = {
        category,
        todoItem,
    }
    return Action(actionTypes.todoDelete, '@멋진삼', new Date(), data)
}

export const makeTodoEditAction = (category, prevTodoItem, currentTodoItem) => {
    const data = {
        category,
        prevTodoItem,
        currentTodoItem,
    }
    return Action(actionTypes.todoEdit, '@멋진삼', new Date(), data)
}

export const makeTodoMoveAction = (
    prevCategory,
    currentCategory,
    prevTodoItem,
    currentTodoItem
) => {
    const data = {
        prevCategory,
        currentCategory,
        prevTodoItem,
        currentTodoItem,
    }
    return Action(actionTypes.todoMove, '@멋진삼', new Date(), data)
}

export const makeTodoSortAction = (category) => {
    const data = {
        category,
    }
    return Action(actionTypes.todoSort, '@멋진삼', new Date(), data)
}
