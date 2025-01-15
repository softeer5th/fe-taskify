import { Action } from '../domain/Action.js'
import { classNames, keys, templateNames } from '../strings.js'
import { actionTypes } from '../types/actionTypes.js'
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
                let content = makeContentLabel(action.type)
                console.log(content)
                component.querySelector(
                    `.${classNames.historyItemContent}`
                ).textContent = content
                // TODO: time 가공하기
                component.querySelector(
                    `.${classNames.historyItemTime}`
                ).textContent = action.timeStamp
            }
        )
    })
}

const makeContentLabel = (actionType) => {
    let content = ''
    const todoTitle = 'ㅈㅁ'
    const category = 'ㅋㅌㄱㄹ'
    const prevCat = 'ㅇㅈㅋㅌㄱㄹ'
    const curCat = 'ㅈㄱㅋㅌㄱㄹ'
    switch (actionType) {
        case actionTypes.todoCreate:
            content = `${todoTitle}을(를) ${category}에 등록하였습니다.`
            break
        case actionTypes.todoDelete:
            content = `${todoTitle}을(를) ${category}에서 삭제하였습니다.`
            break
        case actionTypes.todoEdit:
            content = `${todoTitle}을(를) 변경하였습니다.`
            break
        case actionTypes.todoMove:
            content = `${todoTitle}을(를) ${prevCat}에서 ${curCat}으로 이동하였습니다.`
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
}

const closeHistoryView = () => {
    historyViewElement.style.display = 'none'
    isHistoryViewOpen = false
}

export const addHistory = (action) => {
    historyList.push(action)
    storeData(keys.HISTORY_STORAGE_KEY, historyList)
    renderHistoryView()
}

export const removeAllHistory = () => {
    historyList = []
    storeData(keys.HISTORY_STORAGE_KEY, historyList)
    renderHistoryView()
}
