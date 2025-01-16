import { renderTemplate } from "./main.js";
import { getIsFabOpen, saveData, toggleIsFabOpen } from "./store.js";

export async function addColumn() {
    let newColumnId = document.querySelector("#column-area").childElementCount;
    await renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:newColumnId, title:"제목없음"});
    saveData();
}

// export function moveFab() {
//     if (!getIsFabOpen()) {
//         openFab();
//         setTimeout(()=>{
//             closeFab();
//         }, 3000);
//     }
// }

export function openFab() {
    if (!getIsFabOpen()) {
        toggleIsFabOpen();
    }
    let fabArea = document.querySelector('.fab-area');
    let undo = document.querySelector('.undo');
    let redo = document.querySelector('.redo');
    fabArea.style.height = '200px';
    undo.style.bottom = `120px`;
    undo.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
    redo.style.bottom = `190px`;
    redo.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
}

export function closeFab() {
    let fabArea = document.querySelector('.fab-area');
    let undo = document.querySelector('.undo');
    let redo = document.querySelector('.redo');
    fabArea.style.height = '56px';
    undo.style.bottom = '50px';
    undo.style.boxShadow = "";
    redo.style.bottom = '50px';
    redo.style.boxShadow = "";
    if (getIsFabOpen()) {
        toggleIsFabOpen();
    }
}