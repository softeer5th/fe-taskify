import { createTaskForm, renderTasks } from "./column.js";

const buttonContainers = document.getElementsByClassName('column_button_container');

let dragged = null;

export function handleDrag(e, task) {
    dragged = task;
}

function handleDrop(e) {
    const columnIdx = e.target.getAttribute('index');
    const currentIdx = dragged.column;

    if(columnIdx === currentIdx) return;

    columns[currentIdx] = columns[currentIdx].filter(el => el!=dragged)
    columns[columnIdx].push({...dragged, column : columnIdx})

    renderTasks(columnIdx);
    renderTasks(currentIdx);
}

const columnElements = document.getElementsByClassName('column');

for(let column of columnElements) {
    column.addEventListener('dragover', (e)=>{e.preventDefault();})
    column.addEventListener('drop', handleDrop)
}

for(let i=0; i<buttonContainers.length; i++) {
    const buttons = buttonContainers[i].getElementsByTagName('button');
    const [addButton, deleteButton] = buttons;
    addButton.addEventListener('click', ()=>createTaskForm(i));
}

export let columns = [];
for(let i=0; i<3; i++) {
    columns.push([]);
}
