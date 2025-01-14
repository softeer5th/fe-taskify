import { addListener, renderTemplate, setEventForCard } from "./main.js";
import { createDeleteCardAlert, hideAlert, overlay } from "./alert.js";
import { createNewId } from "./utility.js";

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
    const newCardId = createNewId();
    renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnId, {cardId:newCardId, title:titleValue, content:contentValue,});
}


// 카드 삭제 묻기
export function delCard(cardId) {
    overlay.style.display = "block";
    createDeleteCardAlert(cardId);
    let delCardAlert = document.getElementById(`deleteCardAlert-${cardId}`);
    delCardAlert.style.display = "block";
    let card = document.querySelector("#card-id"+cardId);
    delCardAlert.querySelector('.delObj').textContent = "선택한 카드를 삭제할까요?";
    addListener(delCardAlert.querySelector('#cancel-delete-card-button'),(event)=>{
        hideAlert();
    });
    addListener(delCardAlert.querySelector('#confirm-delete-card-button'),(event)=>{
        hideAlert();
        if (card) {
            card.remove();
        }
    });
}

export let isEditing = false;

// 카드 수정
export function editCard(cardId) {
    let card = document.querySelector("#card-id"+cardId);
    let columnId = card.parentElement.id;
    const tempMemory = [...card.children];
    
    card.style.display = "block";
    isEditing = true;

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

    addListener(newActionDiv.querySelector('.confirm-button'),(event)=>{
        isEditing = false;
        confirmEdit(card,cardId)
    });

    addListener(newActionDiv.querySelector('.cancel-button'),(event)=>{
        isEditing = false;
        cancelEdit(card,tempMemory);
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
function confirmEdit(card, cardId){
    const titleInput = card.querySelector('#title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = card.querySelector('#content-input');
    const contentValue = contentInput.value.trim();
    renderTemplate('./html/card_template.html', 'card-template', card.parentElement.id, {cardId:cardId, title:titleValue, content:contentValue,});
    card.parentNode.removeChild(card);
}

// 수정사항 취소
function cancelEdit(card, tempMemory){
    card.style.display = "flex";
    [...card.children].forEach(element => {
        card.removeChild(element);
    });
    [...tempMemory].forEach(element => {
        card.appendChild(element);
    });
}

export let isDragging = false;
let gapX = 0;
let gapY = 0;
let draggingCardId = 0;

export function startDragCard(event, original, clone, cardId) {
    isDragging = true;
    const childElement = document.querySelector("#card-id"+cardId);
    clone.style.width = window.getComputedStyle(childElement).width;
    draggingCardId = cardId;
    const columnArea = document.getElementById("column-area");
    [...columnArea.children].forEach((column)=> {
        let tempCard = original.cloneNode(true);
        tempCard.id = `temp-${clone.id}`;
        tempCard.className = `temp-card`;
        tempCard.style.opacity = 0.3;
        tempCard.style.display = 'none';
        column.querySelector(".card-list").prepend(tempCard);
    });
    document.body.appendChild(clone);

    const parentRect = childElement.getBoundingClientRect(); // 부모 요소의 경계 정보

    const relativeX = event.clientX - parentRect.left; // 부모 요소 내부에서의 X 좌표
    const relativeY = event.clientY - parentRect.top;  // 부모 요소 내부에서의 Y 좌표

    gapX = relativeX;
    gapY = relativeY+10;

    clone.style.left = `${event.clientX-gapX}px`;
    clone.style.top = `${event.clientY-gapY}px`;
    document.body.classList.add('no-select');
    childElement.remove();
}

export function moveCard(event, clone) {
    if (!isDragging || !clone) return;

    clone.style.left = `${event.clientX-gapX}px`;
    clone.style.top = `${event.clientY-gapY}px`;
}

export function moveCardIllusion(newParent, clone) {
    const columnArea = document.getElementById("column-area");
    [...columnArea.children].forEach((column)=> {
        console.log(column);
        console.log(clone.id);
        let tempCard = column.querySelector(`#temp-${clone.id}`);
        if (tempCard) {
            tempCard.className = "temp-card"
            tempCard.style.display = 'none';
        }
    });
    let tempRealCard = newParent.querySelector(`#temp-${clone.id}`);
    if (tempRealCard) {
        tempRealCard.className = "temp-card-true"
        tempRealCard.style.display = 'flex';
    }
}

export function finishDragCard(clone) {
    if (isDragging && clone) {
        const tempCards = document.querySelectorAll('.temp-card');
        [...tempCards].forEach((tempCard)=>tempCard.remove());
        const realCard = document.querySelector('.temp-card-true');
        realCard.id = "card-id"+draggingCardId;
        realCard.className = "card-id"
        realCard.style.opacity = 1;
        setEventForCard({"cardId": draggingCardId});

        console.log(realCard);
        isDragging = false;
        clone.remove();
        document.body.classList.remove('no-select');
    }
}