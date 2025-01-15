import { generateUid } from '../utils/dataUtil.js'

const createAction = (actionType, userName, timeStamp, data) => {
    return {
        uid: generateUid(),
        type: actionType,
        userName,
        timeStamp,
        data,
    }
}

export const Action = createAction
