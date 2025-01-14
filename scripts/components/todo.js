import { TodoItem } from '../domain/todoItem.js'
import { classNames, templateNames } from '../strings.js'
import {
    createDomElementAsChild,
    createDomElementAsSibling,
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
const DRAG_ELEMENT_KEY = 'dragElement'

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
    let prevCategory = null
    let prevIndex = null
    let currentCategory = null
    let currentIndex = null

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
                component
                    .querySelector(`.${classNames.deleteButton}`)
                    .addEventListener('click', () => {
                        console.log(category.values.todoList)
                    })

                // ###### 드래그 이벤트 ######
                component.addEventListener('dragover', (e) => {
                    // 드롭을 허용하기 위해 기본 동작 취소
                    e.preventDefault()
                })
                component.addEventListener('drop', (e) => {
                    // 일부 요소의 링크 열기와 같은 기본 동작 취소
                    e.preventDefault()
                    setState(DRAG_ELEMENT_KEY, null)
                })

                let dragDepth = 0
                component.addEventListener('dragenter', (e) => {
                    dragDepth++
                    const [originElementId, originIndex] =
                        getState(DRAG_ELEMENT_KEY)

                    const ghostElement = findDomElement(originElementId)
                    let updateFlag = false
                    const categoryList = getState(TODO_CATEGORY_KEY)
                    for (let category of categoryList) {
                        // 카테고리 식별
                        const parentElement = findDomElement(
                            category.identifier
                        )
                        if (!parentElement.contains(e.target)) continue
                        prevCategory = currentCategory ?? category
                        currentCategory = category
                        currentCategory.identifier
                        // )
                        if (
                            prevCategory.identifier !==
                            currentCategory.identifier
                        ) {
                            // 카테고리가 바뀌면 skeleton update
                            console.log(
                                'category change',
                                prevCategory?.identifier,
                                'to',
                                currentCategory.identifier
                            )
                            updateFlag = true
                        }

                        // todoList의 몇 번째 index인지 식별
                        for (let [
                            idx,
                            todoItem,
                        ] of category.values.todoList.entries()) {
                            if (todoItem.identifier === e.target.id) {
                                prevIndex = currentIndex ?? originIndex
                                currentIndex = idx
                                if (prevIndex !== currentIndex) {
                                    // index가 바뀌면 skeleton update
                                    updateFlag = true
                                    console.log(
                                        'index change',
                                        prevIndex,
                                        'to',
                                        currentIndex
                                    )
                                }
                                break
                            }
                        }

                        let isInDragZone = false
                        if (
                            e.target.classList.contains(classNames.todoDragZone)
                        ) {
                            if (currentCategory.values.todoList.length > 0) {
                                currentIndex =
                                    currentCategory.values.todoList.length - 1
                            } else {
                                currentIndex = 0
                            }
                            updateFlag = true
                            isInDragZone = true
                            console.log('dragzone')
                            console.log(
                                'prevCategory',
                                prevCategory.identifier,
                                'prevIndex',
                                prevIndex
                            )
                            console.log(
                                'currentCategory',
                                currentCategory.identifier,
                                'currentIndex',
                                currentIndex
                            )
                        }

                        updateFlag && console.log('flag', updateFlag)

                        if (!updateFlag) return

                        const targetElement =
                            currentCategory.values.todoList.length > 0
                                ? findDomElement(
                                      currentCategory.values.todoList[
                                          currentIndex
                                      ].identifier
                                  )
                                : null

                        if (prevCategory !== currentCategory) {
                            if (isInDragZone) {
                                if (targetElement === null) {
                                    component
                                        .querySelector(
                                            `.${classNames.todoBody}`
                                        )
                                        .appendChild(ghostElement)
                                } else {
                                    targetElement.after(ghostElement)
                                }
                                currentCategory.values.todoList.push(
                                    prevCategory.values.todoList[prevIndex]
                                )
                                prevCategory.values.todoList.splice(
                                    prevIndex,
                                    1
                                )
                                return
                            }
                            targetElement.before(ghostElement)
                            const originTodoItem =
                                prevCategory.values.todoList[prevIndex]
                            const todoList = currentCategory.values.todoList
                            prevCategory.values.todoList.splice(prevIndex, 1)
                            currentCategory.values.todoList = [
                                ...todoList.slice(0, currentIndex),
                                originTodoItem,
                                ...todoList.slice(currentIndex),
                            ]
                            return
                        }

                        const todoList = category.values.todoList
                        if (prevIndex < currentIndex) {
                            targetElement.after(ghostElement)
                            category.values.todoList = [
                                ...todoList.slice(0, prevIndex),
                                ...todoList.slice(
                                    prevIndex + 1,
                                    currentIndex + 1
                                ),
                                todoList[prevIndex],
                                ...todoList.slice(currentIndex + 1),
                            ]
                        } else if (prevIndex > currentIndex) {
                            targetElement.before(ghostElement)
                            category.values.todoList = [
                                ...todoList.slice(0, currentIndex),
                                todoList[prevIndex],
                                ...todoList.slice(currentIndex, prevIndex),
                                ...todoList.slice(prevIndex + 1),
                            ]
                        }
                    }
                })
                component.addEventListener('dragleave', (e) => {
                    dragDepth--
                    if (dragDepth > 0) return
                    console.log('dragleave', category.identifier)
                })
                component.addEventListener('drop', (e) => {
                    console.log('drop', category.identifier)
                    prevCategory = null
                    prevIndex = null
                    currentCategory = null
                    currentIndex = null
                    // storeData(TODO_CATEGORY_KEY, getState(TODO_CATEGORY_KEY))
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
        element.classList.add(classNames.afterImage)
        const index = Array.from(element.parentNode.children).indexOf(element)
        setState(DRAG_ELEMENT_KEY, [e.target.id, index])
    })
    element.addEventListener('drag', (e) => {
        // console.log('drag', e.target)
    })
    element.addEventListener('dragend', (e) => {
        element.classList.remove(classNames.afterImage)
    })
}

const addTodoItem = (title, content, author, category) => {
    const parentDomElement = findDomElement(category.identifier).querySelector(
        `.${classNames.todoBody}`
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
