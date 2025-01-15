import { Action } from '../domain/Action.js'
import { classNames, keys, templateNames } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
import { formatDateToTimeAgo } from '../utils/dateUtil.js'
import { createDomElementAsChild } from '../utils/domUtil.js'
import { loadData, storeData } from '../utils/storageUtil.js'

let historyList = loadData(keys.HISTORY_STORAGE_KEY) ?? []
let isHistoryViewOpen = false
let historyViewElement = null

export const initHistoryView = () => {
    historyViewElement = document.querySelector(`.${classNames.historyView}`)
    const historyToggleBtn = document.querySelector(
        `.${classNames.historyToggleBtn}`
    )
    const historyCloseBtn = historyViewElement.querySelector(
        `.${classNames.historyCloseBtn}`
    )
    const historyClearBtn = historyViewElement.querySelector(
        `.${classNames.historyClearBtn}`
    )

    closeHistoryView()
    historyToggleBtn.addEventListener('click', () => {
        if (isHistoryViewOpen) {
            closeHistoryView()
        } else {
            openHistoryView()
        }
    })
    historyCloseBtn.addEventListener('click', () => {
        closeHistoryView()
    })
    historyClearBtn.addEventListener('click', () => {
        removeAllHistory()
    })

    renderHistoryView()
}

const renderHistoryView = () => {
    const historyBody = historyViewElement.querySelector(
        `.${classNames.historyBody}`
    )
    historyBody.replaceChildren()
    historyList.forEach((action) => {
        createDomElementAsChild(
            templateNames.historyItem,
            historyBody,
            (identifier, component) => {
                let content = makeContentLabel(action)
                component.querySelector(
                    `.${classNames.historyItemContent}`
                ).textContent = content
                // TODO: time 가공하기
                component.querySelector(
                    `.${classNames.historyItemTime}`
                ).textContent = formatDateToTimeAgo(new Date(action.timeStamp))
            },
            false
        )
    })
}

const makeContentLabel = (action) => {
    let content = ''
    console.log(action.data)
    const category = action.data.category?.values.categoryName
    const todoItem = action.data.todoItem
    const prevCategory = action.data.prevCategory?.values.categoryName
    const currentCategory = action.data.currentCategory?.values.categoryName
    const prevTodoItem = action.data.prevTodoItem

    switch (action.type) {
        case actionTypes.todoCreate:
            content = `${todoItem.values.title}을(를) ${category}에 등록하였습니다.`
            break
        case actionTypes.todoDelete:
            content = `${todoItem.values.title}을(를) ${category}에서 삭제하였습니다.`
            break
        case actionTypes.todoEdit:
            content = `${prevTodoItem.values.title}을(를) 변경하였습니다.`
            break
        case actionTypes.todoMove:
            content = `${prevTodoItem.values.title}을(를) ${prevCategory}에서 ${currentCategory}으로 이동하였습니다.`
            break
        case actionTypes.todoSort:
            // content = ``
            break
        default:
            break
    }
    return content
}

const openHistoryView = () => {
    historyViewElement.style.display = 'flex'
    isHistoryViewOpen = true
    renderHistoryView()
}

const closeHistoryView = () => {
    historyViewElement.style.display = 'none'
    isHistoryViewOpen = false
}

export const addHistory = (action) => {
    historyList.push(action)
    storeData(keys.HISTORY_STORAGE_KEY, historyList)
    isHistoryViewOpen && renderHistoryView()
}

export const removeAllHistory = () => {
    historyList = []
    storeData(keys.HISTORY_STORAGE_KEY, historyList)
    renderHistoryView()
}
