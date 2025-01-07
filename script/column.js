import CardForm, { onSubmit } from '../components/cardForm.js';
import { onCancel } from '../components/cardForm.js';
import { columns } from './index.js';
import { createTask } from './task.js';

export function createTaskForm(columnIdx) {
    const cardFormArea = document.getElementsByClassName("card_add")[columnIdx];
    cardFormArea.innerHTML = CardForm();
    const forms = document.getElementsByClassName('card_form');
    for(let form of forms) {
        form.addEventListener('submit', (e)=>onSubmit(e, columnIdx));
        form.getElementsByTagName('button')[0].addEventListener('click', (e)=>onCancel(e))
    }
}


export function renderTasks(columnIdx) {
    const columnCardList = document.getElementsByClassName('column')[columnIdx].getElementsByTagName('ol')[0];
    
    // 현재 카드 전부 제거
    while(columnCardList.firstChild) {
        columnCardList.removeChild(columnCardList.lastChild)
    }

    const tasks = columns[columnIdx];
    console.log(tasks);
    for(let task of tasks) {
        const newTask = createTask(task);
        columnCardList.appendChild(newTask);
    }
}