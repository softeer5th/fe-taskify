import { setState, getState } from "../utils/stateUtil";
import { storeData, loadData } from "../utils/storageUtil";
import { createDomElement } from "../utils/domUtil";

// setState("isCreatingTodo", false)
let isCreatingTodo = false

const initTodo = () => {

}

const addTodo = (title, content, author) => {
    const todoTemplate = document.querySelector(".todo-item-template")
    const component = todoTemplate.content.cloneNode(true)
    
}

const onAddTodoButtonClick = () => {

}