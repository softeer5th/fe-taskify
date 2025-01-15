import { generateUid } from '../utils/dataManager.js'

const createAction = (actionType, userName, timeStamp, data) => {
    return {
        uid: generateUid(),
        actionType,
        userName,
        timeStamp,
        data,
    }
}

export const Action = createAction
