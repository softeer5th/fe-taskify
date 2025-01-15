import { classNames, keys } from '../strings.js'
import { loadData } from '../utils/storageUtil.js'

let historyList = loadData(keys.HISTORY_STORAGE_KEY) ?? []
let isHistoryViewOpen = false
let historyViewElement = null

export const initHistoryView = () => {
    historyViewElement = document.querySelector(`.${classNames.historyView}`)
    const historyToggleBtn = document.querySelector(
        `.${classNames.historyToggleBtn}`
    )
    closeHistoryView()
    historyToggleBtn.addEventListener('click', () => {
        if (isHistoryViewOpen) {
            closeHistoryView()
        } else {
            openHistoryView()
        }
    })
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
}

export const removeAllHistory = () => {
    historyList = []
    storeData(keys.HISTORY_STORAGE_KEY, historyList)
}
