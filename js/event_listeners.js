import { toggleSortOrder,completeColumnName,  } from "./column_action.js";
import { moveCard, finishDragCard } from "./card_action.js";
import { getClone, getIsCardEditing, getIsColumnNameChanging, getIsDragging, getIsOrderChanging, saveData, setClone } from "./store.js";
import { renderTemplate } from "./main.js";

const eventListeners = new WeakMap();

export function addListener(element, listener) {
    if (!eventListeners.has(element)) {
      eventListeners.set(element, []); // 요소에 대한 리스너 배열 초기화
    }
    eventListeners.get(element).push(listener); // 배열에 리스너 추가
}

function triggerListeners(event, startElement) {
    let currentElement = startElement;

    while (currentElement) {
        if (eventListeners.has(currentElement)) {
            const listeners = eventListeners.get(currentElement);
            if (listeners) {
                listeners.forEach((listener) => listener(event, currentElement)); // 등록된 모든 리스너 실행
                break;
            }
        }
        currentElement = currentElement.parentElement; // 부모로 이동
    }
}

document.addEventListener('click', (event) => {
    if (!getIsOrderChanging()) {
        triggerListeners(event, event.target);
    }
    if (getIsColumnNameChanging() && !event.target.closest('.column-name')) {
        completeColumnName();
    }
});

document.addEventListener('dblclick', (event) => {
    if (!getIsOrderChanging()) {
        triggerListeners(event, event.target);
    }
});

document.addEventListener('mousedown', (event) => {
    if (!getIsCardEditing() && !getIsOrderChanging()) {
        triggerListeners(event, event.target);
    }
});

document.addEventListener('mousemove', (event) => {
    if (getIsDragging()) {
        triggerListeners(event, event.target)
    }
});

document.addEventListener('mouseup', (event) => {
    if (getIsDragging()) {
        finishDragCard(getClone());
        setClone(null);
    }
});


document.addEventListener('keydown', (event) => {
    if (getIsColumnNameChanging()) {
        triggerListeners(event, event.target);
    }
});




addListener(document.body, (event)=>{
    moveCard(event, getClone());
})

addListener(document.querySelector('.chip'), (event) =>{
    if (event.type === "click") {
        toggleSortOrder();
    }
});

addListener(document.querySelector('.fab'), async (event)=>{
    if (event.type === "click") {
        let newColumnId = document.querySelector("#column-area").childElementCount;
        await renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:newColumnId, title:"제목없음"});
        saveData();
    }
})