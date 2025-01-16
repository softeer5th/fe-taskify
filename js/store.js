import { renderTemplate } from "./main.js";
import { todoFromJson, todoToJson, todoToObj } from "./utility.js";

let clone = null;
let isOrderChanging = false;
let isColumnNameChanging = false;
let isCardEditing = false;
let isDragging = false;
let todoList = Array();

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

export function saveData() {
    todoList = todoToObj();
    let todoJson = todoToJson(todoList);
    if (todoJson!==localStorage.getItem('content5')) {
        moveBfData();
        localStorage.setItem('content5', todoJson);
        console.log("SAVE!!!!");
    }
}

function moveBfData() {
    for (let i=1; i<6; i++) {
        let bfData = localStorage.getItem(`content${i}`);
        if (bfData) {
            localStorage.setItem(`content${i-1}`, bfData);
        }
    }
}

export function loadData() {
    todoList = todoFromJson(localStorage.getItem('content5')).todo;
    console.log("LOAD!!!!");
    refreshScreen(todoList)
}


function refreshScreen (todoList) {
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