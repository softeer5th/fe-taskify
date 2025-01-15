import { keys } from '../strings.js'
import { getState } from './stateUtil.js'
import { loadData, storeData } from './storageUtil.js'

var lastUid = loadData(keys.LAST_UID_KEY) ?? 0

export const generateUid = () => {
    lastUid++
    storeData(keys.LAST_UID_KEY, lastUid)
    return lastUid
}

export const getCategoryByUid = (categoryUid) => {
    if (!categoryUid) return null
    return getState(keys.TODO_CATEGORY_KEY).find(
        (category) => category.values.uid === categoryUid
    )
}
