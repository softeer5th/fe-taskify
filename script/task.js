import CardForm, { onCancelEdit, onEdit, onSubmit } from "../components/cardForm.js";
import Modal from "../components/modal.js";
import { renderTasks } from "./column.js";
import { columns, handleDrag } from "./index.js";
import { createModalChildren } from "./modal.js";

export function createDeleteModal(task) {
    const body = document.getElementsByTagName("body")[0];
    const modalElement = createModalChildren('선택한 카드를 삭제할까요?', ()=>deleteTask(task))
    const modal = Modal(modalElement);
    body.appendChild(modal);
}



export function createTask(task) {
    const {title, content, created, column} = task;
    
    // 새 카드 컴포넌트 생성
    const newCard = document.createElement('li')
    newCard.setAttribute('class', 'card surface-default shadow-normal rounded-100')
    newCard.setAttribute('draggable', 'true')
    newCard.innerHTML = taskHTML({title, content});
    newCard.addEventListener("dragstart", (e)=>handleDrag(e, task));
    // 이벤트 등록
    taskEventHandler(newCard, task);

    return newCard;
}

export function deleteTask(task) {
    const {title, content, created, column} = task;
    columns[column] = columns[column].filter(el => el != task);
    renderTasks(column);
}

export function editTask(cardElement, task) {
    const {title, content, created, column} = task;
    cardElement.innerHTML = CardForm();
    const inputs = cardElement.getElementsByTagName('input');
    const [titleInput, contentInput] = inputs
    titleInput.value = title;
    contentInput.value = content;
    const form = cardElement.getElementsByTagName('form')[0];
    form.addEventListener('submit', (e)=>{onEdit(e, task)})
    form.getElementsByTagName('button')[0].addEventListener('click', ()=>onCancelEdit(task, cardElement))
}

export function taskHTML({title, content}) {
    return (
    `
        <div class="card_text_container">
            <h4 class="text-strong display-bold14">${title}</h4>
            <p class="text-weak display-medium14">${content}</p>
        </div>
        <div class="card_button_container">
            <button>
                <img width="24" height="24" src="/public/icon/closed.svg"/>
            </button>
            <button>
                <img width="24" height="24" src="/public/icon/edit.svg"/>
            </button>
        </div>
    `
    )
}

export function taskEventHandler(cardElement, task) {
    const buttons = cardElement.getElementsByTagName('button');
    const [deleteButton, editButton] = buttons;
    deleteButton.addEventListener('click', ()=>createDeleteModal(task));
    editButton.addEventListener('click', ()=>editTask(cardElement, task));
}