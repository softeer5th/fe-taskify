import { TodoItem } from '../domain/todoItem.js'
import { classNames, templateNames } from '../strings.js'
import {
    createDomElementAsChild,
    findDomElement,
    removeDomElement,
    replaceDomElement,
} from '../utils/domUtil.js'
import { getState, setState } from '../utils/stateUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'
import { Category } from '../domain/category.js'

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
                ).textContent = category.values.categoryName
                component
                    .querySelector(`.${classNames.addButton}`)
                    .addEventListener('click', () => {
                        onAddTodoButtonClick(category)
                    })

                let currentCategory = null
                let currentIndex = null
                component.addEventListener('dragover', (e) => {
                    // 드롭을 허용하기 위해 기본 동작 취소
                    e.preventDefault()
                })
                component.addEventListener('drop', (e) => {
                    // 일부 요소의 링크 열기와 같은 기본 동작 취소
                    e.preventDefault()
                })
                component.addEventListener('dragenter', (e) => {
                    const categoryList = getState(TODO_CATEGORY_KEY)
                    categoryList.forEach((v, i) => {
                        const parentElement = findDomElement(v.identifier)
                        if (!parentElement.contains(e.target)) return
                        currentCategory = v.identifier
                        console.log('currentCategory', currentCategory)
                    })
                })
                component.addEventListener('dragleave', (e) => {
                    // console.log('dragleave', e.target)
                })
            }
        )
        category.identifier = categoryId
        category.todoFormDomId = null
        category.values.todoList.map((todoItem) => {
            createDomElementAsChild(
                templateNames.todoItem,
                findDomElement(categoryId).querySelector(
                    `.${classNames.todoBody}`
                ),
                (identifier, component) => {
                    todoItem.identifier = identifier
                    initTodoItemElement(component, todoItem)
                }
            )
            // identifier 변경을 todoList에 반영
            return todoItem
        })

        renewTodoCount(category)
        // identifier 변경을 categoryList에 반영
        return category
    })

    setState(TODO_CATEGORY_KEY, categoryList)
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
    const parentDomElement = findDomElement(category.identifier).querySelector(
        `.${classNames.todoBody}`
    )
    const formId = createDomElementAsChild(
        templateNames.todoItemAddForm,
        parentDomElement,
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
                    addTodoItem(title, content, author, category)
                    category.todoFormDomId = null
                    removeDomElement(identifier)
                })
            component
                .querySelector(`.${classNames.todoAddFormCancelBtn}`)
                .addEventListener('click', () => {
                    category.todoFormDomId = null
                    removeDomElement(identifier)
                })
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
    manageDrag(todoElement.querySelector(`.${classNames.todoItemBody}`))
}

const manageDrag = (element) => {
    // let isDragging = false
    let currentCategory = null
    let currentIndex = null
    element.addEventListener('dragstart', (e) => {
        // console.log(e.target)
        // console.log(element.offsetHeight)
    })
    element.addEventListener('drag', (e) => {
        // console.log('drag', e.target)
    })
    element.addEventListener('dragend', (e) => {})
}

const addTodoItem = (title, content, author, category) => {
    const parentDomElement = findDomElement(category.identifier).querySelector(
        classNames.todoBody
    )
    createDomElementAsChild(
        templateNames.todoItem,
        parentDomElement,
        (identifier, component) => {
            const todoItem = TodoItem(identifier, title, content, author)
            category.values.todoList.unshift(todoItem)
            initTodoItemElement(component, todoItem)
        },
        false
    )

    // category 객체를 참조하므로 setState를 안 해도 변경이 되긴 함 .. 맘에 안들지만 일단은 이렇게
    storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))
    renewTodoCount(category)
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
    renewTodoCount(category)
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
                            const editedTodoItem = TodoItem(
                                identifier,
                                title,
                                content,
                                author
                            )
                            initTodoItemElement(component, editedTodoItem)
                            todoList[targetIdx] = editedTodoItem
                        }
                    )
                    storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))
                })
            component
                .querySelector(`.${classNames.todoEditFormCancelBtn}`)
                .addEventListener('click', () => {
                    replaceDomElement(
                        templateNames.todoItem,
                        findDomElement(identifier),
                        (identifier, component) => {
                            const abortedTodoItem = TodoItem(
                                identifier,
                                originTitle,
                                originContent,
                                originAuthor
                            )
                            initTodoItemElement(component, abortedTodoItem)
                            todoList[targetIdx] = abortedTodoItem
                        }
                    )
                })
        }
    )
}

const renewTodoCount = (category) => {
    const todoCount = findDomElement(category.identifier).querySelector(
        `.${classNames.todoHeaderTodoCount}`
    )
    todoCount.textContent = category.values.todoList.length
}
