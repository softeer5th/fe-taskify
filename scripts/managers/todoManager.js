import { TodoItem } from '../domain/todoItem.js'
import { classNames, keys, templateNames } from '../strings.js'
import {
    createDomElementAsChild,
    createDomElementAsSibling,
    findDomElement,
    findDomElementByUid,
    getIdentifierByUid,
    removeDomElement,
    replaceDomElement,
} from '../utils/domUtil.js'
import { getState, setState } from '../utils/stateUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'
import { manageDragEvents, manageDropEvents } from './dragManager.js'
import { Category } from '../domain/category.js'
import { addHistory } from './historyManager.js'
import { addAction } from './actionManager.js'
import {
    makeTodoAddAction,
    makeTodoDeleteAction,
    makeTodoEditAction,
} from '../utils/actionFactory.js'
import { deepCopy } from '../utils/dataUtil.js'

const RESET_DATA = true

export const initTodo = () => {
    RESET_DATA && storeData(keys.TODO_CATEGORY_KEY, [])

    let categoryList = loadData(keys.TODO_CATEGORY_KEY)
    if (!categoryList) {
        storeData(keys.TODO_CATEGORY_KEY, [])
        categoryList = []
    }

    // 더미 데이터 초기화
    if (RESET_DATA) {
        let id = 1
        let categoryCnt = 3
        let eleCnt = 3

        const res = []
        for (let i = 0; i < categoryCnt; i++) {
            res.push(Category(`id-${id}`))
            id += eleCnt + 1
        }
        categoryList = res

        id = 1
        categoryList.forEach((category, index) => {
            const res = []
            for (let i = 0; i < eleCnt; i++) {
                id++
                res.push(TodoItem(`id-${id}`, `내용 - ${index}-${i}`, 'web'))
            }
            id += 1
            category.todoList = res
        })
        storeData(keys.TODO_CATEGORY_KEY, categoryList)
    }

    const mainElement = document.querySelector('.main')

    categoryList.map((category) => {
        const categoryId = createDomElementAsChild(
            templateNames.todoHeader,
            mainElement,
            (identifier, component) => {
                component = component.querySelector(
                    `.${classNames.todoContainer}`
                )
                component.querySelector(
                    `.${classNames.todoHeaderTitle}`
                ).textContent = category.categoryName
                component
                    .querySelector(`.${classNames.addButton}`)
                    .addEventListener('click', () => {
                        onAddTodoButtonClick(category)
                    })
                component
                    .querySelector(`.${classNames.deleteButton}`)
                    .addEventListener('click', () => {
                        console.log(category.todoList)
                    })

                manageDropEvents(component, category)
                return category.uid
            }
        )
        // category.identifier = categoryId
        category.todoFormDomId = null
        category.todoList.map((todoItem) => {
            createDomElementAsChild(
                templateNames.todoItem,
                findDomElement(categoryId).querySelector(
                    `.${classNames.todoBody}`
                ),
                (identifier, component) => {
                    // todoItem.identifier = identifier
                    initTodoItemElement(component, todoItem)
                    return todoItem.uid
                }
            )
            // identifier 변경을 todoList에 반영
            return todoItem
        })

        renewTodoCount(category)
        // identifier 변경을 categoryList에 반영
        return category
    })

    setState(keys.TODO_CATEGORY_KEY, categoryList)
}

const onAddTodoButtonClick = (category) => {
    if (category.todoFormDomId) {
        disableAddTodoForm(category)
    } else {
        enableAddTodoForm(category)
    }
}

// TODO: form이 비어 있으면 submit 버튼 비활성화
const enableAddTodoForm = (category) => {
    const todoBodyElement = findDomElementByUid(category.uid).querySelector(
        `.${classNames.todoBody}`
    )
    const formId = createDomElementAsChild(
        templateNames.todoItemAddForm,
        todoBodyElement,
        (identifier, component) => {
            component
                .querySelector(`.${classNames.todoAddFormSubmitBtn}`)
                .addEventListener('click', () => {
                    const formElement = findDomElement(identifier)
                    const title = formElement.querySelector(
                        `.${classNames.todoAddFormInputTitle}`
                    ).value
                    const content = formElement.querySelector(
                        `.${classNames.todoAddFormInputContent}`
                    ).value
                    const author = 'web'
                    const todoItem = TodoItem(title, content, author)
                    handleTodoCreate(todoItem, category)
                    category.todoFormDomId = null
                    removeDomElement(identifier)
                })
            component
                .querySelector(`.${classNames.todoAddFormCancelBtn}`)
                .addEventListener('click', () => {
                    category.todoFormDomId = null
                    removeDomElement(identifier)
                })
            return null
        },
        false
    )
    // state에 변경사항 반영
    category.todoFormDomId = formId
}

const disableAddTodoForm = (category) => {
    removeDomElement(category.todoFormDomId)
    category.todoFormDomId = null
}

const initTodoItemElement = (todoElement, todoItem) => {
    const { uid, title, content, author } = todoItem

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
            handleTodoDelete(uid)
        })
    todoElement
        .querySelector(`.${classNames.editButton}`)
        .addEventListener('click', () => {
            handleTodoEdit(uid)
        })
    manageDragEvents(todoElement.querySelector(`.${classNames.todoItemBody}`))
}

const handleTodoCreate = (todoItem, category) => {
    const todoBodyElement = findDomElementByUid(category.uid).querySelector(
        `.${classNames.todoBody}`
    )
    createDomElementAsChild(
        templateNames.todoItem,
        todoBodyElement,
        (identifier, component) => {
            addTodoItemToList(todoItem, category, 0)
            initTodoItemElement(component, todoItem)
            return todoItem.uid
        },
        false
    )

    // category 객체를 참조하므로 setState를 안 해도 변경이 되긴 함 .. 맘에 안들지만 일단은 이렇게
    storeData(keys.TODO_CATEGORY_KEY, getState(keys.TODO_CATEGORY_KEY))
    renewTodoCount(category)
    const todoAddAction = makeTodoAddAction(category.uid, todoItem)
    addAction(todoAddAction)
    addHistory(todoAddAction)
    return getIdentifierByUid(todoItem.uid)
}

const addTodoItemToList = (todoItem, category, index) => {
    const todoList = category.todoList
    category.todoList = [
        ...todoList.slice(0, index),
        todoItem,
        ...todoList.slice(index),
    ]
}

const getTodoItemInfo = (todoItemUid) => {
    const categoryList = getState(keys.TODO_CATEGORY_KEY)
    for (let category of categoryList) {
        for (let [idx, todo] of category.todoList.entries()) {
            if (todo.uid === todoItemUid) {
                return { category: category, index: idx, todoItem: todo }
            }
        }
    }
    return null
}

const handleTodoDelete = (uid) => {
    const { category, index, todoItem } = getTodoItemInfo(uid)
    category.todoList.splice(index, 1)
    const identifier = getIdentifierByUid(uid)
    removeDomElement(identifier)
    renewTodoCount(category)
    storeData(keys.TODO_CATEGORY_KEY, getState(keys.TODO_CATEGORY_KEY))

    const todoDeleteAction = makeTodoDeleteAction(category.uid, todoItem, index)
    addAction(todoDeleteAction)
    addHistory(todoDeleteAction)
}

const handleTodoEdit = (todoItemUid) => {
    const {
        category,
        index: targetIdx,
        todoItem,
    } = getTodoItemInfo(todoItemUid)
    const originTodoItem = deepCopy(todoItem)
    const {
        uid: originUid,
        title: originTitle,
        content: originContent,
        author: originAuthor,
    } = originTodoItem

    const originTodoElement = findDomElementByUid(originUid)
    replaceDomElement(
        templateNames.todoItemEditForm,
        originTodoElement,
        (identifier, component) => {
            component.querySelector(
                `.${classNames.todoEditFormInputTitle}`
            ).value = originTitle
            component.querySelector(
                `.${classNames.todoEditFormInputContent}`
            ).value = originContent
            component
                .querySelector(`.${classNames.todoEditFormSubmitBtn}`)
                .addEventListener('click', () => {
                    const editFormElement = findDomElement(identifier)
                    const title = editFormElement.querySelector(
                        `.${classNames.todoEditFormInputTitle}`
                    ).value
                    const content = editFormElement.querySelector(
                        `.${classNames.todoEditFormInputContent}`
                    ).value
                    // TODO: author 정보 동적으로 가져오기
                    const author = 'web'
                    replaceDomElement(
                        templateNames.todoItem,
                        editFormElement,
                        (identifier, component) => {
                            todoItem.title = title
                            todoItem.content = content
                            todoItem.author = author
                            initTodoItemElement(component, todoItem)
                            return todoItem.uid
                        }
                    )
                    storeData(
                        keys.TODO_CATEGORY_KEY,
                        getState(keys.TODO_CATEGORY_KEY)
                    )
                    const todoEditAction = makeTodoEditAction(
                        category.uid,
                        originTodoItem,
                        todoItem,
                        category.todoList.indexOf(todoItem)
                    )
                    addAction(todoEditAction)
                    addHistory(todoEditAction)
                })
            component
                .querySelector(`.${classNames.todoEditFormCancelBtn}`)
                .addEventListener('click', () => {
                    replaceDomElement(
                        templateNames.todoItem,
                        findDomElement(identifier),
                        (identifier, component) => {
                            initTodoItemElement(component, originTodoItem)
                            // todoList[targetIdx] = abortedTodoItem
                        }
                    )
                })
        }
    )
}

export const renewTodoCount = (category) => {
    const todoCount = findDomElementByUid(category.uid).querySelector(
        `.${classNames.todoHeaderTodoCount}`
    )
    todoCount.textContent = category.todoList.length
}

export const undoTodoItemCreate = (category, todoItem) => {
    const { _, index, __ } = getTodoItemInfo(todoItem.uid)
    category.todoList.splice(index, 1)
}

export const undoTodoItemDelete = (category, todoItem, index) => {
    const copiedTodoItem = deepCopy(todoItem)
    addTodoItemToList(copiedTodoItem, category, index)
    if (index === 0) {
        handleTodoCreate
    }
    const todoBodyElement = findDomElementByUid(category.uid).querySelector(
        `.${classNames.todoBody}`
    )
    // createDomElementAsSibling()
}
