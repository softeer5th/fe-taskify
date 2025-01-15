/**
 *  action type에 따른 data 구조 정의
 *
 *  todoCreate, todoDelete, todoEdit =
 *  {
 *      categoryUid,
 *      todoIndex,
 *  }
 *
 *  todoMove =
 *  {
 *      prevCategoryUid,
 *      currentCategoryUid,
 *      prevTodoIndex,
 *      currentTodoIndex,
 *  }
 *
 *  todoSort =
 *  {
 *      categoryUid,
 *  }
 */

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
