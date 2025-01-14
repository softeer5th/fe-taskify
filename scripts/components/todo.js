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

                    const originElement = findDomElement(originElementId)
                    let skeletonUpdateFlag = false
                    // if (!e.target.contains(`.${classNames.todoItemBody}`))
                    //     return
                    const categoryList = getState(TODO_CATEGORY_KEY)
                    for (let category of categoryList) {
                        // 카테고리 식별
                        const parentElement = findDomElement(
                            category.identifier
                        )
                        if (!parentElement.contains(e.target)) continue
                        if (
                            currentCategory?.identifier !== category.identifier
                        ) {
                            // 카테고리가 바뀌면 skeleton update
                            console.log(
                                'category change',
                                currentCategory?.identifier,
                                'to',
                                category.identifier
                            )
                            // if (currentCategory !== null) {
                            skeletonUpdateFlag = true
                            // }
                        }
                        prevCategory = currentCategory
                        currentCategory = category
                        // todoList의 몇 번째 index인지 식별
                        for (let [
                            idx,
                            todoItem,
                        ] of category.values.todoList.entries()) {
                            if (todoItem.identifier === e.target.id) {
                                // 순서 바뀐 후 다시 origin으로 초기화되는 현상 방지
                                if (e.target.id === originElementId) break
                                if (currentIndex !== idx) {
                                    // index가 바뀌면 skeleton update
                                    console.log(
                                        'index change',
                                        currentIndex,
                                        'to',
                                        idx
                                    )
                                    // if (currentIndex !== null) {
                                    skeletonUpdateFlag = true
                                    // }
                                    prevIndex = currentIndex ?? originIndex
                                    currentIndex = idx
                                }
                                break
                            }
                        }
                        // 컨테이너 빈 영역에 대해서는 todo 리스트의 맨 끝에 추가
                        if (e.target.className === classNames.todoContainer) {
                            skeletonUpdateFlag = true
                            currentIndex = category.values.todoList.length
                        }
                        // 자식 요소에 이벤트 전달되면 null값이 들어감...
                        // if (currentIndex === null) {
                        //     return
                        // }
                        skeletonUpdateFlag &&
                            console.log('flag', skeletonUpdateFlag)
                        // console.log(
                        //     'dragenter',
                        //     currentCategory.identifier,
                        //     currentIndex
                        // )
                        if (!skeletonUpdateFlag) return

                        if (prevCategory !== currentCategory) {
                            return
                        }

                        const bodyElement = parentElement.querySelector(
                            `.${classNames.todoBody}`
                        )
                        const targetElement = findDomElement(
                            category.values.todoList[currentIndex].identifier
                        )
                        const todoList = category.values.todoList
                        const originTodoItem = todoList[currentIndex]
                        if (prevIndex < currentIndex) {
                            // bodyElement.childNodes[currentIndex].after(
                            //     originElement
                            // )
                            targetElement.after(originElement)
                            // todoList.splice(prevIndex, 1)
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
                            // bodyElement.childNodes[currentIndex].before(
                            //     originElement
                            // )
                            targetElement.before(originElement)
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
                    // e.stopPropagation()
                    findDomElement(identifier)
                        .querySelector(`.${classNames.skeleton}`)
                        .remove()
                })
                component.addEventListener('drop', (e) => {
                    console.log('drop', category.identifier)
                    prevCategory = null
                    prevIndex = null
                    currentCategory = null
                    currentIndex = null
                    findDomElement(identifier)
                        .querySelector(`.${classNames.skeleton}`)
                        .remove()
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
        const index = Array.from(element.parentNode.children).indexOf(element)
        setState(DRAG_ELEMENT_KEY, [e.target.id, index])
    })
    element.addEventListener('drag', (e) => {
        // console.log('drag', e.target)
    })
    element.addEventListener('dragend', (e) => {})
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
