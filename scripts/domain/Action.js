/**
 *  action type에 따른 data 구조 정의
 *
 *  todoCreate, todoDelete =
 *  {
 *      category,
 *      todoItem,
 *  }
 *
 *  todoEdit =
 *  {
 *      category,
 *      prevTodoItem,
 *      currentTodoItem,
 *  }
 *
 *  todoMove =
 *  {
 *      prevCategory,
 *      currentCategory,
 *      prevTodoItem,
 *      currentTodoItem,
 *  }
 *
 *  todoSort =
 *  {
 *      category,
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
