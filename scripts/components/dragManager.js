import { classNames, keys } from '../strings.js'
import { findDomElement } from '../utils/domUtil.js'
import { getState, setState } from '../utils/stateUtil.js'

let prevCategory = null
let prevIndex = null
let currentCategory = null
let currentIndex = null

export const manageDragEvents = (dragTargetElement) => {
    const element = dragTargetElement
    element.addEventListener('dragstart', (e) => {
        element.classList.add(classNames.afterImage)
        const index = Array.from(element.parentNode.children).indexOf(element)
        setState(keys.DRAG_ELEMENT_KEY, [e.target.id, index])
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
        setState(keys.DRAG_ELEMENT_KEY, null)
    })

    let dragDepth = 0
    component.addEventListener('dragenter', (e) => {
        dragDepth++
        const [originElementId, originIndex] = getState(keys.DRAG_ELEMENT_KEY)

        const ghostElement = findDomElement(originElementId)
        let updateFlag = false
        const categoryList = getState(keys.TODO_CATEGORY_KEY)
        for (let category of categoryList) {
            // 카테고리 식별
            const parentElement = findDomElement(category.identifier)
            if (!parentElement.contains(e.target)) continue
            prevCategory = currentCategory ?? category
            currentCategory = category
            currentCategory.identifier
            // )
            if (prevCategory.identifier !== currentCategory.identifier) {
                // 카테고리가 바뀌면 skeleton update
                updateFlag = true
            }

            // todoList의 몇 번째 index인지 식별
            for (let [idx, todoItem] of category.values.todoList.entries()) {
                if (todoItem.identifier === e.target.id) {
                    prevIndex = currentIndex ?? originIndex
                    currentIndex = idx
                    if (prevIndex !== currentIndex) {
                        // index가 바뀌면 skeleton update
                        updateFlag = true
                    }
                    break
                }
            }

            let isInDragZone = false
            if (e.target.classList.contains(classNames.todoDragZone)) {
                if (currentCategory.values.todoList.length > 0) {
                    currentIndex = currentCategory.values.todoList.length - 1
                } else {
                    currentIndex = 0
                }
                updateFlag = true
                isInDragZone = true
            }
            if (!updateFlag) return

            const targetElement =
                currentCategory.values.todoList.length > 0
                    ? findDomElement(
                          currentCategory.values.todoList[currentIndex]
                              .identifier
                      )
                    : null

            if (prevCategory !== currentCategory) {
                if (isInDragZone) {
                    if (targetElement === null) {
                        component
                            .querySelector(`.${classNames.todoBody}`)
                            .appendChild(ghostElement)
                    } else {
                        targetElement.after(ghostElement)
                    }
                    currentCategory.values.todoList.push(
                        prevCategory.values.todoList[prevIndex]
                    )
                    prevCategory.values.todoList.splice(prevIndex, 1)
                    return
                }
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

            const todoList = category.values.todoList
            if (prevIndex < currentIndex) {
                targetElement.after(ghostElement)
                category.values.todoList = [
                    ...todoList.slice(0, prevIndex),
                    ...todoList.slice(prevIndex + 1, currentIndex + 1),
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
        // storeData(keys.TODO_CATEGORY_KEY, getState(keys.TODO_CATEGORY_KEY))
    })
}
