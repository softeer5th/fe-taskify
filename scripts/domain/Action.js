/**
 *  action type에 따른 data 구조 정의
 *
 *  todoCreate =
 *  {
 *      categoryUid,
 *      todoItem,
 *  }
 *
 *  *  todoDelete =
 *  {
 *      categoryUid,
 *      todoItem,
 *      index,
 *  }
 *
 *  todoEdit =
 *  {
 *      categoryUid,
 *      prevTodoItem,
 *      currentTodoItem,
 *      index,
 *  }
 *
 *  todoMove =
 *  {
 *      prevCategoryUid,
 *      currentCategoryUid,
 *      prevTodoItem,
 *      currentTodoItem,
 *      prevIndex,
 *      currentIndex,
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
