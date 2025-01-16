import { classNames, keys } from '../strings.js'
import { makeTodoMoveAction } from '../utils/actionFactory.js'
import { getTodoItemInfoByUid } from '../utils/dataUtil.js'
import {
    findDomElement,
    findDomElementByUid,
    getIdentifierByUid,
    getUidByIdentifier,
} from '../utils/domUtil.js'
import { getState } from '../utils/stateUtil.js'
import { storeData } from '../utils/storageUtil.js'
import { addAction } from './actionManager.js'
import { addHistory } from './historyManager.js'
import { renewTodoCount } from './todoManager.js'

// const DEBUG = true
const DEBUG = false

let originElementId = null
let originCategory = null
let originIndex = null
let originTodoItem = null

let prevCategory = null
let prevIndex = null
let currentCategory = null
let currentIndex = null

export const manageDragEvents = (dragTargetElement) => {
    const element = dragTargetElement
    element.addEventListener('dragstart', (e) => {
        element.classList.add(classNames.afterImage)
        const eventTargetUid = getUidByIdentifier(e.target.id)

        const { category, index, todoItem } =
            getTodoItemInfoByUid(eventTargetUid)

        originElementId = e.target.id
        originCategory = category
        originIndex = index
        originTodoItem = category.todoList[index]
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

    dragReceiverElement.addEventListener('dragover', (e) => {
        // 드롭을 허용하기 위해 기본 동작 취소
        e.preventDefault()
    })
    let dragDepth = 0
    component.addEventListener('dragenter', (e) => {
        dragDepth++

        const ghostElement = findDomElement(originElementId)
        let updateFlag = false
        const categoryList = getState(keys.TODO_CATEGORY_KEY)
        for (let category of categoryList) {
            // 카테고리 식별
            // TODO: refactor
            const parentElement = findDomElement(
                getIdentifierByUid(category.uid)
            )
            if (!parentElement.contains(e.target)) continue
            prevCategory = currentCategory
            currentCategory = category
            if (prevCategory.uid !== currentCategory.uid) {
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
            for (let [idx, todoItem] of currentCategory.todoList.entries()) {
                if (getIdentifierByUid(todoItem.uid) === e.target.id) {
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
                    console.log('prevCategory', prevCategory.uid, prevIndex)
                    console.log(
                        'currentCategory',
                        currentCategory.uid,
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

                    currentCategory.todoList.push(
                        prevCategory.todoList[prevIndex]
                    )
                    prevCategory.todoList.splice(prevIndex, 1)
                    prevIndex = currentCategory.todoList.length - 1
                    currentIndex = prevIndex
                    DEBUG && console.log(prevCategory.uid, currentCategory.uid)
                    return
                }

                if (prevCategory === currentCategory) {
                    currentIndex = currentCategory.todoList.length - 1
                }
            }

            const targetElement = findDomElementByUid(
                currentCategory.todoList[currentIndex].uid //err
            )

            if (prevCategory !== currentCategory) {
                targetElement.before(ghostElement)
                const originTodoItem = prevCategory.todoList[prevIndex]
                const todoList = currentCategory.todoList
                prevCategory.todoList.splice(prevIndex, 1)
                currentCategory.todoList = [
                    ...todoList.slice(0, currentIndex),
                    originTodoItem,
                    ...todoList.slice(currentIndex),
                ]
                return
            }

            const todoList = currentCategory.todoList
            if (prevIndex < currentIndex) {
                targetElement.after(ghostElement)
                currentCategory.todoList = [
                    ...todoList.slice(0, prevIndex),
                    ...todoList.slice(prevIndex + 1, currentIndex + 1),
                    todoList[prevIndex],
                    ...todoList.slice(currentIndex + 1),
                ]
            } else if (prevIndex > currentIndex) {
                targetElement.before(ghostElement)
                currentCategory.todoList = [
                    ...todoList.slice(0, currentIndex),
                    todoList[prevIndex],
                    ...todoList.slice(currentIndex, prevIndex),
                    ...todoList.slice(prevIndex + 1),
                ]
            }
        }
    })
    dragReceiverElement.addEventListener('dragleave', (e) => {
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
    dragReceiverElement.addEventListener('drop', (e) => {
        DEBUG &&
            console.log(
                'drop',
                originCategory.identifier,
                originIndex,
                'to ',
                currentCategory.identifier,
                currentIndex
            )
        // 일부 요소의 링크 열기와 같은 기본 동작 취소
        e.preventDefault()
        renewTodoCount(originCategory)
        renewTodoCount(currentCategory)

        storeData(keys.TODO_CATEGORY_KEY, getState(keys.TODO_CATEGORY_KEY))

        if (originCategory !== currentCategory) {
            const todoMoveAction = makeTodoMoveAction(
                originCategory.uid,
                currentCategory.uid,
                originTodoItem,
                currentCategory.todoList[currentIndex],
                originIndex,
                currentIndex
            )

            addAction(todoMoveAction)
            addHistory(todoMoveAction)
        }

        originElementId = null
        originCategory = null
        originIndex = null
        prevCategory = null
        prevIndex = null
        currentCategory = null
        currentIndex = null
    })
}
