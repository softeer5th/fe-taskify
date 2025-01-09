import { setState, getState } from '../utils/stateUtil.js'
import { storeData, loadData } from '../utils/storageUtil.js'
import {
    createDomElement,
    findDomElement,
    removeDomElement,
} from '../utils/domUtil.js'
import { classNames, templateNames } from '../strings.js'

const TODO_LIST_STORAGE_KEY = 'todoList'
const TODO_FORM_DOM_ID_KEY = 'isCreatingTodo'

const initTodo = () => {
    setState(TODO_FORM_DOM_ID_KEY, false)
    const storedTodoList = loadData(TODO_LIST_STORAGE_KEY)
    storeData(TODO_LIST_STORAGE_KEY, [])
    storedTodoList?.forEach((todo) => {
        addTodoItem(todo.values.title, todo.values.content, todo.values.author)
    })
}

export const toggleAddTodoButton = () => {
    const isCreatingTodo = getState(TODO_FORM_DOM_ID_KEY)
    if (isCreatingTodo) {
        disableAddTodoForm()
    } else {
        enableAddTodoForm()
    }
}

const enableAddTodoForm = () => {
    const parentDomElement = document.querySelector('.todos__body')
    const formId = createDomElement(
        templateNames.todoItemAddForm,
        parentDomElement,
        false
    )

    setState(TODO_FORM_DOM_ID_KEY, formId)
    const formElement = findDomElement(formId)
    formElement
        .querySelector(`.${classNames.todoAddFormSubmitBtn}`)
        .addEventListener('click', () => {
            const title = formElement.querySelector(
                `.${classNames.todoAddFormInputTitle}`
            ).value
            const content = formElement.querySelector(
                `.${classNames.todoAddFormInputContent}`
            ).value
            const author = 'author'
            addTodoItem(title, content, author)
            removeDomElement(formId)
            setState(TODO_FORM_DOM_ID_KEY, null)
        })
    formElement
        .querySelector(`.${classNames.todoAddFormCancelBtn}`)
        .addEventListener('click', () => {
            removeDomElement(formId)
            setState(TODO_FORM_DOM_ID_KEY, null)
        })
}

const disableAddTodoForm = () => {
    removeDomElement(getState(TODO_FORM_DOM_ID_KEY))
    setState(TODO_FORM_DOM_ID_KEY, null)
}

export const addTodoItem = (title, content, author) => {
    // TODO: 하드코딩된 부모 클래스명 변경
    const parentDomElement = document.querySelector('.todos__body')
    const identifier = createDomElement(
        templateNames.todoItem,
        parentDomElement,
        false
    )

    const prevTodoList = loadData(TODO_LIST_STORAGE_KEY)
    prevTodoList.unshift({
        identifier: identifier,
        values: { title, content, author },
    })
    storeData(TODO_LIST_STORAGE_KEY, prevTodoList)

    const element = findDomElement(identifier)
    element.querySelector(`.${classNames.todoItemTitle}`).textContent = title
    element.querySelector(`.${classNames.todoItemContent}`).textContent =
        content
    element.querySelector(`.${classNames.todoItemAuthor}`).textContent = author

    element
        .querySelector(`.${classNames.deleteButton}`)
        .addEventListener('click', () => {
            removeTodoItem(identifier)
        })
    element
        .querySelector(`.${classNames.editButton}`)
        .addEventListener('click', () => {
            editTodoItem(identifier)
        })
}

// const createCategory = (categoryName) => {}

const removeTodoItem = (identifier) => {
    const prevTodoList = loadData(TODO_LIST_STORAGE_KEY)
    const targetIdx = prevTodoList.findIndex(
        (todo) => todo.identifier === identifier
    )
    prevTodoList.splice(targetIdx, 1)
    removeDomElement(identifier)
    storeData(TODO_LIST_STORAGE_KEY, prevTodoList)
}

const editTodoItem = (identifier) => {
    console.log(`editing todo - ${identifier}`)
}

initTodo()
