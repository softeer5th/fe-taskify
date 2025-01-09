import { setState, getState } from './utils/stateUtil.js'
import { storeData, loadData } from './utils/storageUtil.js'
import { addTodoItem } from './components/todo.js'

document
    .querySelector('.todos__header')
    .querySelector('.add-btn')
    .addEventListener('click', () => {
        addTodoItem('title', 'content', 'author', true)
        setState('isCreatingTodo', !getState('isCreatingTodo'))
    })
