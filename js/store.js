import { renderTemplate } from "./main.js";
import { todoFromJson, todoToJson, todoToObj } from "./utility.js";

const maxMemInd = 5;
let clone = null;
let isOrderChanging = false;
let isColumnNameChanging = false;
let isCardEditing = false;
let isDragging = false;
let todoList = Array();
let isFabOpen = false;
let memoryIndex = maxMemInd;

export function getClone () {
    return clone;
}

export function setClone (newClone) {
    clone = newClone;
}


export function getIsOrderChanging () {
    return isOrderChanging;
}

export function toggleIsOrderChanging () {
    isOrderChanging = !isOrderChanging;
}


export function getIsColumnNameChanging () {
    return isColumnNameChanging;
}

export function toggleIsColumnNameChanging () {
    isColumnNameChanging = !isColumnNameChanging;
}


export function getIsCardEditing () {
    return isCardEditing;
}

export function toggleIsCardEditing () {
    isCardEditing = !isCardEditing;
}


export function getIsDragging () {
    return isDragging;
}

export function toggleIsDragging () {
    isDragging = !isDragging;
}

export function getIsFabOpen () {
    return isFabOpen;
}

export function toggleIsFabOpen() {
    isFabOpen = !isFabOpen;
}

export function getMemInd() {
    return memoryIndex;
}

export function decMemInd() {
    if (memoryIndex>0) {
        memoryIndex -= 1;
    }
    saveRecentInd();
    return memoryIndex;
}

export function incMemInd() {
    if (memoryIndex<maxMemInd) {
        memoryIndex += 1;
    }
    saveRecentInd();
    return memoryIndex;
}

function saveRecentInd() {
    localStorage.setItem('memInd', memoryIndex);
}

function loadRecentInd() {
    let temp = localStorage.getItem('memInd');
    if (temp!==null && temp!=="null") {
        memoryIndex = parseInt(temp);
    } else {
        memoryIndex = maxMemInd;
    }
}

export function saveData() {
    todoList = todoToObj();
    let todoJson = todoToJson(todoList);
    if (todoJson!==localStorage.getItem(`content${memoryIndex}`)) {
        // undo를 했던 경우 memoryIndex가 maxMemInd보다 작음
        if (memoryIndex<maxMemInd) {
            // 현재 상태를 기준으로 그 이후에 했던 것을 날림
            removeAfData(maxMemInd-memoryIndex);
        }
        memoryIndex = maxMemInd;
        // 저장하기 위해 앞서 했던 것들을 한칸씩 당겨서 저장
        moveBfData();
        localStorage.setItem(`content${memoryIndex}`, todoJson);
        saveRecentInd();
    }
}

function removeAfData(gap) {
    for (let i=memoryIndex; i>-1; i--) {
        let bfData = localStorage.getItem(`content${i}`);
        if (bfData!==null && bfData!=="null") {
            localStorage.setItem(`content${i+gap}`, bfData);
            localStorage.setItem(`content${i}`, null);
        }
    }
}

function moveBfData() {
    for (let i=0; i<memoryIndex+1; i++) {
        let bfData = localStorage.getItem(`content${i}`);
        if (bfData) {
            localStorage.setItem(`content${i-1}`, bfData);
        }
    }
}

export function loadData(isInit) {
    if (isInit) {
        loadRecentInd();
        for (let i=0; i<maxMemInd+1; i++) {
            if (i!==memoryIndex) {
                localStorage.setItem(`content${i}`,null);
            } else {
                let temp = todoFromJson(localStorage.getItem(`content${i}`));
                if (temp) {
                    todoList = temp.todo;
                }
            }
        }
        localStorage.setItem(`content${maxMemInd}`, todoToJson(todoList));
        memoryIndex = maxMemInd;
    } else {
        let temp = todoFromJson(localStorage.getItem(`content${memoryIndex}`));
        if (temp) {
            todoList = temp.todo;
        }
    }
    if (todoList) {
        refreshScreen(todoList);
    } else {
        resetTodo();
    }
}


function refreshScreen (todoList) {
    document.querySelector('#column-area').innerHTML = ``;
    todoList.forEach(async (todo, i)=>{
        await renderColumn(todo, i);
        todo.cardList.forEach(async (card)=>{
            await renderCard(card, i)
        })
    });
}

async function renderColumn(columnData, index) {
    await renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId: index, title: columnData.title, isDefault: index<3});
}


async function renderCard(cardData, columnIndex) {
    await renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnIndex, {cardId:cardData.id, title:cardData.title, content:cardData.content,});
}

export async function resetTodo() {
    document.querySelector('#column-area').innerHTML = ``;
    localStorage.clear();
    let initData = [
        {"title":"해야할 일"},
        {"title":"하고 있는 일"},
        {"title":"완료한 일"},
    ];
    for (let i=0; i<3; i++) {
        await renderColumn(initData[i],i);
    }
    saveData();
}