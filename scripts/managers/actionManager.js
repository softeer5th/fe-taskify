import { keys } from '../strings'
import { loadData, storeData } from '../utils/storageUtil'
import { addHistory } from './historyManager'

let actionList = loadData(keys.ACTION_STORAGE_KEY) ?? []
let pointer = loadData(keys.ACTION_POINTER_STORAGE_KEY) ?? -1

// action이 굉장히 길어지면? 최대 개수 제한하고 circular queue로 구현?
export const addAction = (action) => {
    pointer++
    if (pointer == actionList.length) {
        actionList.push(action)
    } else {
        actionList[pointer] = action
        actionList.splice(pointer + 1)
    }
    addHistory(action)
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    storeData(keys.ACTION_STORAGE_KEY, actionList)
}

// export const removeAllAction = () => {
//     actionList = []
//     storeData(keys.ACTION_STORAGE_KEY, actionList)
// }

export const undoRecentAction = (callback) => {
    if (pointer < 0) {
        throw Error('No action to undo')
    }
    const action = actionList[pointer]
    pointer--
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    callback(action.actionType, action.data)
}

export const redoRecentAction = (callback) => {
    if (pointer == actionList.length - 1) {
        throw Error('No action to redo')
    }
    pointer++
    const action = actionList[pointer]
    storeData(keys.ACTION_POINTER_STORAGE_KEY, pointer)
    callback(action.actionType, action.data)
}
