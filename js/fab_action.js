import { renderTemplate } from "./main.js";
import { decMemInd, getIsFabOpen, getMemInd, incMemInd, loadData, saveData, toggleIsFabOpen } from "./store.js";

export async function addColumn() {
    let newColumnId = document.querySelector("#column-area").childElementCount;
    await renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:newColumnId, title:"제목없음"});
    saveData();
}

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


export function undo() {
    let curMemInd = getMemInd();
    console.log(getMemInd());
    let newMemInd = decMemInd();
    console.log(getMemInd());
    if (curMemInd!==newMemInd
        && localStorage.getItem(`content${newMemInd}`)!=="null"
        && localStorage.getItem(`content${newMemInd}`)!==null) {
        console.log(localStorage.getItem(`content${newMemInd}`)); 
        loadData(false);
    } else if (curMemInd!==newMemInd) {
        incMemInd();
    }
    console.log(getMemInd());
}

export function redo() {
    let curMemInd = getMemInd();
    console.log(getMemInd());
    let newMemInd = incMemInd();
    console.log(getMemInd());
    if (curMemInd!==newMemInd
        && localStorage.getItem(`content${newMemInd}`) !=="null" 
        && localStorage.getItem(`content${newMemInd}`)!==null) {
        document.querySelector('#column-area').innerHTML = ``;
        loadData(false);
    } else if (curMemInd!==newMemInd) {
        decMemInd();
    }
    console.log(getMemInd());
}