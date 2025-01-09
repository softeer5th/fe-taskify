import { setState, getState } from '../utils/stateUtil.js'
import { storeData, loadData } from '../utils/storageUtil.js'
import { createDomElement } from '../utils/domUtil.js'
import { classNames, templateNames } from '../strings.js'

setState('isCreatingTodo', false)

const initTodo = () => {}

export const addTodoItem = (title, content, author) => {
    // TODO: 하드코딩된 부모 클래스명 변경
    const parentDomElement = document.querySelector('.todos__body')
    const identifier = createDomElement(
        templateNames.todoItem,
        parentDomElement
    )

    const element = document.querySelector(`#${identifier}`)
    element.querySelector(`.${classNames.todoItemTitle}`).textContent = title
    element.querySelector(`.${classNames.todoItemContent}`).textContent =
        content
    element.querySelector(`.${classNames.todoItemAuthor}`).textContent = author

    element
        .querySelector(`.${classNames.deleteButton}`)
        .addEventListener('click', () => {
            removeTodoItem(identifier)
            alert('delete!')
        })
    element
        .querySelector(`.${classNames.editButton}`)
        .addEventListener('click', () => {
            editTodoItem(identifier)
            alert('edit!')
        })
}

// const createCategory = (categoryName) => {}

const removeTodoItem = (identifier) => {
    console.log(`removing todo - ${identifier}`)
}

const editTodoItem = (identifier) => {
    console.log(`editing todo - ${identifier}`)
}
