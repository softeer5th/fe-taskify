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
import { Category } from '../domain/Category.js'

// const TODO_LIST_STORAGE_KEY = 'todoList'
const TODO_CATEGORY_KEY = 'todoCategory'
// const TODO_FORM_DOM_ID_KEY = 'isCreatingTodo'

export const initTodo = () => {
    let categoryList = loadData(TODO_CATEGORY_KEY)
    if (!categoryList) {
        storeData(TODO_CATEGORY_KEY, [])
        categoryList = []
    }

    // 더미 데이터
    // categoryList = [Category(-1, '해야할 일'), Category(-1, '하고 있는 일')]
    // storeData(TODO_CATEGORY_KEY, categoryList)

    const todoHeaderParentElement = document.querySelector('.main')
    categoryList.map((category) => {
        const categoryId = createDomElementAsChild(
            templateNames.todoHeader,
            todoHeaderParentElement
        )
        category.identifier = categoryId
        category.todoFormDomId = null

        const element = findDomElement(categoryId)
        element.querySelector(`.${classNames.todoHeaderTitle}`).textContent =
            category.values.categoryName
        element
            .querySelector(`.${classNames.addButton}`)
            .addEventListener('click', () => {
                onAddTodoButtonClick(category)
            })

        category.values.todoList.map((todoItem) => {
            const todoElementId = createDomElementAsChild(
                templateNames.todoItem,
                findDomElement(categoryId).querySelector(
                    `.${classNames.todoBody}`
                )
            )
            todoItem.identifier = todoElementId
            const todoElement = findDomElement(todoElementId)
            initTodoItemElement(todoElement, todoItem)
            // identifier 변경을 todoList에 반영
            return todoItem
        })

        // identifier 변경을 categoryList에 반영
        return category
    })

    setState(TODO_CATEGORY_KEY, categoryList)
}

export const onAddTodoButtonClick = (category) => {
    if (category.todoFormDomId) {
        disableAddTodoForm(category)
    } else {
        enableAddTodoForm(category)
    }
}

// TODO: form이 비어 있으면 submit 버튼 비활성화
const enableAddTodoForm = (category) => {
    const parentDomElement = findDomElement(category.identifier).querySelector(
        `.${classNames.todoBody}`
    )
    const formId = createDomElementAsChild(
        templateNames.todoItemAddForm,
        parentDomElement,
        false
    )
    category.todoFormDomId = formId
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
            addTodoItem(title, content, author, category)
            category.todoFormDomId = null
            removeDomElement(formId)
        })
    formElement
        .querySelector(`.${classNames.todoAddFormCancelBtn}`)
        .addEventListener('click', () => {
            category.todoFormDomId = null
            removeDomElement(formId)
        })
}

const disableAddTodoForm = (category) => {
    removeDomElement(category.todoFormDomId)
    category.todoFormDomId = null
}

const initTodoItemElement = (todoElement, todoItem) => {
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
    // category 정보 어떻게 얻어올 것인지 ?
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

const addTodoItem = (title, content, author, category) => {
    // TODO: 하드코딩된 부모 클래스명 변경
    const parentDomElement = findDomElement(category.identifier).querySelector(
        '.todos__body'
    )
    const identifier = createDomElementAsChild(
        templateNames.todoItem,
        parentDomElement,
        false
    )

    const todoItem = TodoItem(identifier, title, content, author)
    category.values.todoList.unshift(todoItem)
    // setState(TODO_CATEGORY_KEY, category)
    // category 객체를 참조하므로 setState를 안 해도 변경이 되긴 함 .. 맘에 안들지만 일단은 이렇게
    storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))

    const element = findDomElement(identifier)
    initTodoItemElement(element, todoItem)
}

const getTodoItemInfo = (identifier) => {
    const categoryList = getState(TODO_CATEGORY_KEY)
    for (let category of categoryList) {
        for (let [idx, todo] of category.values.todoList.entries()) {
            if (todo.identifier === identifier) {
                return { category: category, index: idx, todoItem: todo }
            }
        }
    }
    return null
}

const removeTodoItem = (identifier) => {
    const { category, index, todoItem } = getTodoItemInfo(identifier)
    category.values.todoList.splice(index, 1)
    removeDomElement(identifier)
    storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))
}

const editTodoItem = (identifier) => {
    const { category, index: targetIdx, todoItem } = getTodoItemInfo(identifier)
    const todoList = category.values.todoList

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
            // TODO: author 정보 동적으로 가져오기
            const author = 'web'

            const editedTodoElementId = replaceDomElement(
                templateNames.todoItem,
                formElement
            )

            const editedTodoItem = TodoItem(
                editedTodoElementId,
                title,
                content,
                author
            )
            const editedTodoElement = findDomElement(editedTodoElementId)
            initTodoItemElement(editedTodoElement, editedTodoItem)

            todoList[targetIdx] = editedTodoItem
            storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))
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
            initTodoItemElement(abortedTodoItemElement, abortedTodoItem)
            todoList[targetIdx] = abortedTodoItem
        })
}
