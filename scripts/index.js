import { setState, getState } from './utils/stateUtil.js'
import { storeData, loadData } from './utils/storageUtil.js'
import { onAddTodoButtonClick } from './components/todo.js'

document
    .querySelector('.todos__header')
    .querySelector('.add-btn')
    .addEventListener('click', () => {
        onAddTodoButtonClick()
    })
