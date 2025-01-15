import { keys } from '../strings.js'
import { loadData, storeData } from './storageUtil.js'

var lastUid = loadData(keys.LAST_UID_KEY) ?? 0

export const generateUid = () => {
    lastUid++
    storeData(keys.LAST_UID_KEY, lastUid)
    return lastUid
}
