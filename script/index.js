import { createLogLayerElement, setLog } from "./logScript.js";
import { createTaskForm, handleSortOrder, renderTasks } from "./column.js";
import {  taskHTML } from "./task.js";

let dragged = null;
let draggedElement = null;
export let columns = [];

export function handleDrag(e, task) {
    console.log(task);
    dragged = task;
    draggedElement = e.target;
}

function handleDropContainer(e) {
    if(e.target.tagName === 'UL') {
        draggedElement.style.opacity = 1;
        dragged = null;
        draggedElement = null;
        return;
    }
}

function handleDrop(e) {
    e.stopPropagation();
    const columnIdx = Number(e.currentTarget.getAttribute("index"));
    const currentIdx = dragged.column;

    if (columnIdx === currentIdx) {
        draggedElement.style.opacity = 1;
        dragged = null;
        draggedElement = null;
        return;
    }

    columns[currentIdx] = columns[currentIdx].filter((el) => el != dragged);
    columns[columnIdx].push({ ...dragged, column: columnIdx });

    setLog({
        task: dragged,
        type: 'move',
        updated: new Date(),
        destination: columnIdx
    });

    dragged = null;
    draggedElement = null;

    renderTasks(columnIdx);
    renderTasks(currentIdx);
}

function createDummyTask(task) {
    const { title, content, created, column } = task;

    // 새 카드 컴포넌트 생성
    const newCard = document.createElement("li");
    newCard.setAttribute(
        "class",
        "card surface-default shadow-normal rounded-100"
    );
    newCard.setAttribute("id", "dummy");
    newCard.innerHTML = taskHTML({ title, content });
    newCard.style.opacity = 0.3;

    return newCard;
}


// column에 drag 대상이 들어올 경우
function handleDragEnter(e) {
    e.stopPropagation();
    // 같은 column 내부에서는 이벤트 진행 방지
    if (e.currentTarget.contains(e.relatedTarget)) return;

    const columnIdx = Number(e.currentTarget.getAttribute("index"));
    if (columnIdx === undefined || columnIdx === null) return;

    // 초기 드래그 대상 투명화
    if (dragged.column === columnIdx) {
        draggedElement.style.opacity = 0.3;
        return;
    }

    const columnListElement = e.currentTarget.getElementsByTagName("ol")[0];

    // 잔상 중복 생성 방지
    const dummy = columnListElement.querySelector("#dummy");
    if (dummy) return;
    const dummyCard = createDummyTask(dragged);

    columnListElement.appendChild(dummyCard);
}

// column drag 대상이 나갈 경우
function handleDragLeave(e) {
    e.stopPropagation();
    // 같은 column 내부에서는 이벤트 진행 방지
    if (e.currentTarget.contains(e.relatedTarget)) return;

    const columnIdx = Number(e.currentTarget.getAttribute("index"));
    if (columnIdx === undefined || columnIdx === null) return;

    // 초기 드래그 대상 투명화
    if (dragged.column === columnIdx) {
        draggedElement.style.opacity = 0;
        return;
    }

    const columnListElement = e.currentTarget.getElementsByTagName("ol")[0];

    // Enter시 생성한 dummy 제거
    const dummy = columnListElement.querySelector("#dummy");
    if (dummy) {
        columnListElement.removeChild(dummy);
    }
}

function handleLogOpen() {
    const existLayer = document.body.querySelector('#log_layer');
    //log layer가 이미 존재한다면 제거
    if(existLayer) {
        document.body.removeChild(existLayer);
        return;
    }
    const logLayer = createLogLayerElement();

    document.body.appendChild(logLayer);
}

// 초기 이벤트 등록 및 mock 데이터 생성
function init() {
    const columnElements = document.getElementsByClassName("column");
    const columnContainer = document.getElementById("column_container");
    columnContainer.addEventListener('dragover', (e)=>{e.preventDefault()})
    columnContainer.addEventListener('drop', handleDropContainer);
    
    for (let column of columnElements) {
        // drop event를 사용하기 위해서는 dragover에서 e.preventDefault가 선언되어야 함.
        column.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
        column.addEventListener("drop", handleDrop);
        column.addEventListener("dragenter", handleDragEnter);
        column.addEventListener("dragleave", handleDragLeave);
    }

    const buttonContainers = document.getElementsByClassName(
        "column_button_container"
    );
    for (let i = 0; i < buttonContainers.length; i++) {
        const buttons = buttonContainers[i].getElementsByTagName("button");
        const [addButton, deleteButton] = buttons;
        addButton.addEventListener("click", () => createTaskForm(i));
    }

    const logButton = document.querySelector('#log_button');
    logButton.addEventListener('click', handleLogOpen);

    const sortButton = document.querySelector('#sort_button');
    sortButton.addEventListener('click', handleSortOrder);

    for (let i = 0; i < 3; i++) {
        columns.push([]);
    }

    columns[0].push({
        title: "제목1",
        content: "내용1",
        column: 0,
        created: new Date(),
    });
    renderTasks(0);
}

init();