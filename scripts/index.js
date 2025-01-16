import { initUndoButton } from './managers/actionManager.js'
import { initHistoryView } from './managers/historyManager.js'
import { initTodo } from './managers/todoManager.js'

initTodo()
initHistoryView()
initUndoButton()
