import { addTask } from "./column.js";

const buttonContainers = document.getElementsByClassName('column_button_container');

for(let i=0; i<buttonContainers.length; i++) {
    const buttons = buttonContainers[i].getElementsByTagName('button');
    const addButton = buttons[0];
    addButton.addEventListener('click', ()=>addTask(i));
    const deleteButton = buttons[1];
}

