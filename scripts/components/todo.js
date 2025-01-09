import { setState, getState } from "../utils/stateUtil"
import { storeData, loadData } from "../utils/storageUtil"
import { createDomElement } from "../utils/domUtil"

setState("isCreatingTodo", false)

let isCreatingTodo = false

const initTodo = () => {}

export const addTodoItem = (category, title, content, author) => {
    const { identifier, element } = createDomElement("todo-item-template")
    element.querySelector(".delete-btn").addEventListener("click", () => {
        removeTodoItem(identifier)
    })
    element.querySelector(".edit-btn").addEventListener("click", () => {
        editTodoItem(identifier)
    })
}

const onAddTodoButtonClick = () => {}

// const createCategory = (categoryName) => {}

const removeTodoItem = (identifier) => {
    console.log(`removing todo - ${identifier}`)
}

const editTodoItem = (identifier) => {
    console.log(`editing todo - ${identifier}`)
}
