import { setState, getState } from '../utils/stateUtil.js'
import { storeData, loadData } from '../utils/storageUtil.js'
import {
    createDomElementAsChild,
    findDomElement,
    removeDomElement,
    replaceDomElement,
} from '../utils/domUtil.js'
import { classNames, templateNames } from '../strings.js'
import { TodoItem } from '../domain/todoItem.js'

const TODO_LIST_STORAGE_KEY = 'todoList'
const TODO_FORM_DOM_ID_KEY = 'isCreatingTodo'

const initTodo = () => {
    setState(TODO_FORM_DOM_ID_KEY, false)
    const storedTodoList = loadData(TODO_LIST_STORAGE_KEY)
    storeData(TODO_LIST_STORAGE_KEY, [])
    storedTodoList?.reverse().forEach((todo) => {
        addTodoItem(todo.values.title, todo.values.content, todo.values.author)
    })
}

export const onAddTodoButtonClick = () => {
    const isCreatingTodo = getState(TODO_FORM_DOM_ID_KEY)
    if (isCreatingTodo) {
        disableAddTodoForm()
    } else {
        enableAddTodoForm()
    }
}

// TODO: form이 비어 있으면 submit 버튼 비활성화
const enableAddTodoForm = () => {
    const parentDomElement = document.querySelector('.todos__body')
    const formId = createDomElementAsChild(
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
            const author = 'web'
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

const initTodoItem = (todoElement, todoItem) => {
    const {
        identifier,
        values: { title, content, author },
    } = todoItem

    todoElement.querySelector(`.${classNames.todoItemTitle}`).textContent =
        title
    todoElement.querySelector(`.${classNames.todoItemContent}`).textContent =
        content
    todoElement.querySelector(
        `.${classNames.todoItemAuthor}`
    ).textContent = `author by ${author}`

    todoElement
        .querySelector(`.${classNames.deleteButton}`)
        .addEventListener('click', () => {
            removeTodoItem(identifier)
        })
    todoElement
        .querySelector(`.${classNames.editButton}`)
        .addEventListener('click', () => {
            editTodoItem(identifier)
        })
}

const addTodoItem = (title, content, author) => {
    // TODO: 하드코딩된 부모 클래스명 변경
    const parentDomElement = document.querySelector('.todos__body')
    const identifier = createDomElementAsChild(
        templateNames.todoItem,
        parentDomElement,
        false
    )

    const prevTodoList = loadData(TODO_LIST_STORAGE_KEY)
    const todoItem = TodoItem(identifier, title, content, author)
    prevTodoList.unshift(todoItem)
    storeData(TODO_LIST_STORAGE_KEY, prevTodoList)

    const element = findDomElement(identifier)
    initTodoItem(element, todoItem)
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
    const todoList = loadData(TODO_LIST_STORAGE_KEY)
    const targetIdx = todoList.findIndex(
        (todo) => todo.identifier === identifier
    )
    const originTodoItem = todoList[targetIdx]
    const {
        title: originTitle,
        content: originContent,
        author: originAuthor,
    } = originTodoItem.values

    const originTodoElement = findDomElement(identifier)
    const formId = replaceDomElement(
        templateNames.todoItemEditForm,
        originTodoElement
    )
    const formElement = findDomElement(formId)

    formElement.querySelector(`.${classNames.todoEditFormInputTitle}`).value =
        originTitle
    formElement.querySelector(`.${classNames.todoEditFormInputContent}`).value =
        originContent
    formElement
        .querySelector(`.${classNames.todoEditFormSubmitBtn}`)
        .addEventListener('click', () => {
            const title = formElement.querySelector(
                `.${classNames.todoEditFormInputTitle}`
            ).value
            const content = formElement.querySelector(
                `.${classNames.todoEditFormInputContent}`
            ).value
            const author = 'web'

            const editedTodoElementId = replaceDomElement(
                templateNames.todoItem,
                formElement
            )

            const newTodoItem = TodoItem(
                editedTodoElementId,
                title,
                content,
                author
            )
            const editedTodoElement = findDomElement(editedTodoElementId)
            initTodoItem(editedTodoElement, newTodoItem)

            todoList[targetIdx] = newTodoItem
            storeData(TODO_LIST_STORAGE_KEY, todoList)
        })
    formElement
        .querySelector(`.${classNames.todoEditFormCancelBtn}`)
        .addEventListener('click', () => {
            const abortedTodoItemId = replaceDomElement(
                templateNames.todoItem,
                formElement
            )
            const abortedTodoItemElement = findDomElement(abortedTodoItemId)
            const abortedTodoItem = TodoItem(
                abortedTodoItemId,
                originTitle,
                originContent,
                originAuthor
            )
            initTodoItem(abortedTodoItemElement, abortedTodoItem)
            todoList[targetIdx] = abortedTodoItem
            storeData(TODO_LIST_STORAGE_KEY, todoList)
        })
}

const findTodoItem = (identifier) => {
    const todoList = loadData(TODO_LIST_STORAGE_KEY)
    const targetIdx = todoList.findIndex(
        (todo) => todo.identifier === identifier
    )
    return { index: index, value: todoList[targetIdx] }
}

initTodo()
