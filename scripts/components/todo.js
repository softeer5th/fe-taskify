import { setState, getState } from '../utils/stateUtil.js'
import { storeData, loadData } from '../utils/storageUtil.js'
import { createDomElement } from '../utils/domUtil.js'

setState('isCreatingTodo', false)

const initTodo = () => {}

export const addTodoItem = (title, content, author) => {
    const parentDomElement = document.querySelector('.todos')
    alert(parentDomElement)
    const { identifier, element } = createDomElement(
        'todo-item-template',
        parentDomElement
    )
    element.querySelector('.delete-btn').addEventListener('click', () => {
        removeTodoItem(identifier)
    })
    element.querySelector('.edit-btn').addEventListener('click', () => {
        editTodoItem(identifier)
    })
    alert(`${identifier}, ${title}, ${content}, ${author}`)
}

// const createCategory = (categoryName) => {}

const removeTodoItem = (identifier) => {
    console.log(`removing todo - ${identifier}`)
}

const editTodoItem = (identifier) => {
    console.log(`editing todo - ${identifier}`)
}
