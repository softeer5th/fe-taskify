import { toggleSortOrder,completeColumnName,  } from "./column_action.js";
import { moveCard, finishDragCard } from "./card_action.js";
import { getClone, getIsCardEditing, getIsColumnNameChanging, getIsDragging, getIsOrderChanging, resetTodo, saveData, setClone } from "./store.js";
import { addColumn, closeFab, openFab, redo, undo } from "./fab_action.js";
import { clearHistoryDialog } from "./history.js";


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

document.addEventListener('mouseover', (event) => {
    triggerListeners(event, event.target)
});


document.addEventListener('mouseout', (event) => {
    triggerListeners(event, event.target)
});

document.addEventListener('mouseup', (event) => {
    if (getIsDragging()) {
        finishDragCard(event, getClone());
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


addListener(document.querySelector('.fab-area'), async (event)=>{
    if (event.type === "mouseover") {
        openFab();
    } else if (event.type === "mouseout") {
        closeFab();
    }
})

addListener(document.querySelector('.add-column'), async (event)=>{
    if (event.type === "click") {
        addColumn();
    } else if (event.type === "mouseover") {
        openFab();
    } else if (event.type === "mouseout") {
        closeFab();
    }
})

addListener(document.querySelector('.undo'), (event)=> {
    if (event.type === 'click') {
        undo();
    } else if (event.type === "mouseover") {
        openFab();
    } else if (event.type === "mouseout") {
        closeFab();
    }
})

addListener(document.querySelector('.redo'), (event)=> {
    if (event.type === 'click') {
        redo();
    } else if (event.type === "mouseover") {
        openFab();
    } else if (event.type === "mouseout") {
        closeFab();
    }
})


addListener(document.querySelector('.reset'), (event) =>{
    if (event.type === "click") {
        resetTodo();
    }
});


addListener(document.querySelector('.clear-history'), (event)=> {
    if (event.type === "click") {
        clearHistoryDialog();
    }
});