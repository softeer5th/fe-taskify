import createFormElement from '../script/formScript.js';
import { columns } from './index.js';
import { createTask } from './task.js';

export function createTaskForm(columnIdx) {
    const cardFormArea = document.getElementsByClassName("card_add")[columnIdx];
    
    // 이미 Form이 존재하는 경우, + 버튼으로 존재하는 Form을 닫기
    const isCardFormExists = cardFormArea.children.length !== 0;
    if(isCardFormExists) {
        cardFormArea.removeChild(cardFormArea.children[0])
        return;
    }

    const formElement = createFormElement(undefined, columnIdx);

    cardFormArea.appendChild(formElement)
}


export function renderTasks(columnIdx) {
    const columnElement = document.getElementsByClassName('column')[columnIdx];
    const columnCardList = columnElement.getElementsByTagName('ol')[0];
    const counterElement = columnElement.getElementsByClassName('column_task_counter')[0];
    
    // 현재 카드 전부 제거
    while(columnCardList.firstChild) {
        columnCardList.removeChild(columnCardList.lastChild)
    }

    const tasks = columns[columnIdx];
    counterElement.textContent = tasks.length;
    
    for(let task of tasks) {
        const newTask = createTask(task);
        columnCardList.appendChild(newTask);
    }
}