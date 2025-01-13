import renderTemplate from "./main.js";
import { createDeleteCardAlert, hideAlert, overlay } from "./alert.js";

// 입력창 확인 후 버튼 활성화 결정
export function checkCardInput() {
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    const confirmBtn = document.querySelector('.confirm-button');
    titleInput.style.height = 'auto';
    titleInput.style.height = `${titleInput.scrollHeight}px`;
    contentInput.style.height = 'auto';
    contentInput.style.height = `${contentInput.scrollHeight}px`;
    if (titleValue!=='' && contentValue!=='') {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

// 카드 추가 확정
export function confirmAddCard(columnId){
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    const newCardId = document.getElementById('card-list'+columnId).childElementCount;
    renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnId, {columnId: columnId, cardId:newCardId, title:titleValue, content:contentValue,});
}


// 카드 삭제 묻기
export function delCard(columnId, cardId) {
    overlay.style.display = "block";
    createDeleteCardAlert(columnId, cardId);
    let delCardAlert = document.getElementById(`deleteCardAlert-${columnId}-${cardId}`);
    delCardAlert.style.display = "block";
    let column = document.getElementById("card-list"+columnId);
    let card = column.querySelector("#card-id"+cardId);
    delCardAlert.querySelector('.delObj').textContent = "선택한 카드를 삭제할까요?";
    delCardAlert.querySelector('#cancel-delete-card-button').addEventListener('click',(event)=>{
        hideAlert();
    });
    delCardAlert.querySelector('#confirm-delete-card-button').addEventListener('click',(event)=>{
        hideAlert();
        if (column.contains(card)) {
            column.removeChild(card);
        }
    });
}


// 카드 수정
export function editCard(columnId, cardId) {
    let column = document.getElementById("card-list"+columnId);
    let card = column.querySelector("#card-id"+cardId);
    const tempMemory = [...card.children];
    
    card.style.display = "block";

    let curTitle = card.querySelector(".card-title").textContent;
    let curContent = card.querySelector(".card-content").textContent;

    const newInfoDiv = document.createElement('div');
    newInfoDiv.className = 'card-info';
    newInfoDiv.innerHTML = `
        <textarea id="title-input" class="card-title" maxlength="500" rows="1">${curTitle}</textarea>
        <textarea id="content-input" class="card-content" maxlength="500" rows="1"/>${curContent}</textarea>
    `;
    const newActionDiv = document.createElement('div');
    newActionDiv.className = 'action-buttons';
    newActionDiv.innerHTML = `
        <button class="cancel-button">
            취소
        </button>
        <div style="width:10px"></div>
        <button class="confirm-button">
            등록    
        </button>
    `;

    newActionDiv.querySelector('.confirm-button').addEventListener('click', (event)=> {
        applyChanges(card, columnId, cardId)
    });
    newActionDiv.querySelector('.cancel-button').addEventListener('click', (event)=> {
        undoChanges(card,tempMemory);
    });
    newInfoDiv.querySelector('#title-input').addEventListener('input', (event)=>{
        checkCardInput();
    });
    newInfoDiv.querySelector('#content-input').addEventListener('input', (event)=>{
        checkCardInput();
    });

    [...tempMemory].forEach(element => {
        card.removeChild(element);
    });

    card.appendChild(newInfoDiv);
    card.appendChild(newActionDiv);
}

// 수정사항 반영
function applyChanges(card, columnId, cardId){
    const titleInput = card.querySelector('#title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = card.querySelector('#content-input');
    const contentValue = contentInput.value.trim();
    renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnId, {columnId: columnId, cardId:cardId, title:titleValue, content:contentValue,});
    card.parentNode.removeChild(card);
}

// 수정사항 취소
function undoChanges(card, tempMemory){
    card.style.display = "flex";
    [...card.children].forEach(element => {
        card.removeChild(element);
    });
    [...tempMemory].forEach(element => {
        card.appendChild(element);
    });
}

let isDragging = false;

export function startDragCard(event, clone) {
    isDragging = true;

    document.body.appendChild(clone);

    clone.style.left = `${event.clientX}px`;
    clone.style.top = `${event.clientY}px`;
}

export function moveCard(event, clone) {
    if (!isDragging || !clone) return;

    clone.style.left = `${event.clientX}px`;
    clone.style.top = `${event.clientY}px`;
    console.log(clone.style.left);
}

export function finishDragCard(clone) {
    if (isDragging && clone) {
        isDragging = false;

        clone.remove();
    }
}