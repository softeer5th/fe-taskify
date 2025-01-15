import { classNames, keys } from '../strings.js'
import { findDomElement } from '../utils/domUtil.js'
import { getState } from '../utils/stateUtil.js'
import { storeData } from '../utils/storageUtil.js'
import { renewTodoCount } from './todoManager.js'

const DEBUG = false

let originElementId = null
let originCategory = null
let originIndex = null

let prevCategory = null
let prevIndex = null
let currentCategory = null
let currentIndex = null

export const manageDragEvents = (dragTargetElement) => {
    const element = dragTargetElement
    element.addEventListener('dragstart', (e) => {
        element.classList.add(classNames.afterImage)
        const index = Array.from(element.parentNode.children).indexOf(element)

        const category = getState(keys.TODO_CATEGORY_KEY).find((category) => {
            return category.values.todoList.some(
                (todoItem) => todoItem.identifier === e.target.id
            )
        })
        originElementId = e.target.id
        originCategory = category
        originIndex = index
        prevCategory = category
        currentCategory = category
        prevIndex = index
        currentIndex = index
        // console.log('originCategory', originCategory.identifier)
    })
    element.addEventListener('drag', (e) => {})
    element.addEventListener('dragend', (e) => {
        element.classList.remove(classNames.afterImage)
    })
}

export const manageDropEvents = (dragReceiverElement, category) => {
    const component = dragReceiverElement

    component.addEventListener('dragover', (e) => {
        // 드롭을 허용하기 위해 기본 동작 취소
        e.preventDefault()
    })
    component.addEventListener('drop', (e) => {
        // 일부 요소의 링크 열기와 같은 기본 동작 취소
        e.preventDefault()
        renewTodoCount(originCategory)
        renewTodoCount(currentCategory)

        originElementId = null
        originCategory = null
        originIndex = null
        prevCategory = null
        prevIndex = null
        currentCategory = null
        currentIndex = null
    })

    let dragDepth = 0
    component.addEventListener('dragenter', (e) => {
        dragDepth++

        const ghostElement = findDomElement(originElementId)
        let updateFlag = false
        const categoryList = getState(keys.TODO_CATEGORY_KEY)
        for (let category of categoryList) {
            // 카테고리 식별
            const parentElement = findDomElement(category.identifier)
            if (!parentElement.contains(e.target)) continue
            prevCategory = currentCategory
            currentCategory = category
            if (prevCategory.identifier !== currentCategory.identifier) {
                // 카테고리가 바뀌면 dom update
                updateFlag = true

                DEBUG &&
                    console.log(
                        'category change',
                        prevCategory?.identifier,
                        'to',
                        currentCategory.identifier
                    )
            }

            // todoList의 몇 번째 index인지 식별
            for (let [
                idx,
                todoItem,
            ] of currentCategory.values.todoList.entries()) {
                if (todoItem.identifier === e.target.id) {
                    // err
                    prevIndex = currentIndex
                    currentIndex = idx
                    if (prevIndex !== currentIndex) {
                        // index가 바뀌면 dom update
                        updateFlag = true

                        DEBUG &&
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
            if (e.target.classList.contains(classNames.todoDragZone)) {
                updateFlag = true
                isInDragZone = true
                if (DEBUG) {
                    console.log('[ dragzone ]')
                    console.log(
                        'prevCategory',
                        prevCategory.identifier,
                        prevIndex
                    )
                    console.log(
                        'currentCategory',
                        currentCategory.identifier,
                        currentIndex
                    )
                }
            }
            if (!updateFlag) return

            if (isInDragZone) {
                if (prevCategory !== currentCategory) {
                    component
                        .querySelector(`.${classNames.todoBody}`)
                        .appendChild(ghostElement)

                    currentCategory.values.todoList.push(
                        prevCategory.values.todoList[prevIndex]
                    )
                    prevCategory.values.todoList.splice(prevIndex, 1)
                    prevIndex = currentCategory.values.todoList.length - 1
                    currentIndex = prevIndex
                    DEBUG &&
                        console.log(
                            prevCategory.identifier,
                            currentCategory.identifier
                        )
                    return
                }

                if (prevCategory === currentCategory) {
                    currentIndex = currentCategory.values.todoList.length - 1
                }
            }

            const targetElement = findDomElement(
                currentCategory.values.todoList[currentIndex].identifier //err
            )

            if (prevCategory !== currentCategory) {
                targetElement.before(ghostElement)
                const originTodoItem = prevCategory.values.todoList[prevIndex]
                const todoList = currentCategory.values.todoList
                prevCategory.values.todoList.splice(prevIndex, 1)
                currentCategory.values.todoList = [
                    ...todoList.slice(0, currentIndex),
                    originTodoItem,
                    ...todoList.slice(currentIndex),
                ]
                return
            }

            const todoList = currentCategory.values.todoList
            if (prevIndex < currentIndex) {
                targetElement.after(ghostElement)
                currentCategory.values.todoList = [
                    ...todoList.slice(0, prevIndex),
                    ...todoList.slice(prevIndex + 1, currentIndex + 1),
                    todoList[prevIndex],
                    ...todoList.slice(currentIndex + 1),
                ]
            } else if (prevIndex > currentIndex) {
                targetElement.before(ghostElement)
                currentCategory.values.todoList = [
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
        DEBUG && console.log('dragleave', prevIndex, currentIndex)
        DEBUG &&
            console.log(
                'dragleave',
                prevCategory.identifier,
                currentCategory.identifier
            )
    })
    component.addEventListener('drop', (e) => {
        DEBUG && console.log('drop', category.identifier)
        prevCategory = null
        prevIndex = null
        currentCategory = null
        currentIndex = null
        storeData(keys.TODO_CATEGORY_KEY, getState(keys.TODO_CATEGORY_KEY))
    })
}
