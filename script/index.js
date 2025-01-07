import { createTaskForm, renderTasks } from "./column.js";

const buttonContainers = document.getElementsByClassName('column_button_container');

for(let i=0; i<buttonContainers.length; i++) {
    const buttons = buttonContainers[i].getElementsByTagName('button');
    const [addButton, deleteButton] = buttons;
    addButton.addEventListener('click', ()=>createTaskForm(i));
}

export let columns = [];
for(let i=0; i<3; i++) {
    columns.push([]);
}