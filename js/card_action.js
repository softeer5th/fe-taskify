import { renderTemplate, setEventForCard } from "./main.js";
import { createDeleteCardAlert, hideAlert, overlay } from "./alert.js";
import { createNewId } from "./utility.js";
import { addListener } from "./event_listeners.js";
import { getIsDragging, saveData, toggleIsCardEditing, toggleIsDragging } from "./store.js";

let gapX = 0;
let gapY = 0;
let draggingCardId = 0;

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
export async function confirmAddCard(columnId){
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    const newCardId = createNewId();
    await renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnId, {cardId:newCardId, title:titleValue, content:contentValue,});
    saveData();
}


// 카드 삭제 묻기
export function delCard(cardId) {
    overlay.style.display = "block";
    createDeleteCardAlert(cardId);
    let delCardAlert = document.getElementById(`deleteCardAlert-${cardId}`);
    delCardAlert.style.display = "block";
    let card = document.querySelector("#card-id"+cardId);
    delCardAlert.querySelector('.delObj').textContent = "선택한 카드를 삭제할까요?";
    addListener(delCardAlert.querySelector('#cancel-del-card-button'),(event)=>{
        if (event.type === 'click') {
            hideAlert();
        }
    });
    addListener(delCardAlert.querySelector('#confirm-del-card-button'),(event)=>{
        if (event.type === 'click') {
            hideAlert();
            if (card) {
                card.remove();
                saveData();
            }
        }
    });
}

// 카드 수정
export function editCard(cardId) {
    let card = document.querySelector("#card-id"+cardId);
    const tempMemory = [...card.children];
    
    card.style.display = "block";
    toggleIsCardEditing();

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

    [...tempMemory].forEach(element => {
        card.removeChild(element);
    });

    card.appendChild(newInfoDiv);
    card.appendChild(newActionDiv);


    addListener(newActionDiv.querySelector('.confirm-button'), async (event)=>{
        if (event.type === 'click') {
            toggleIsCardEditing();
            await confirmEdit(card,cardId)
        }
    });

    addListener(newActionDiv.querySelector('.cancel-button'),(event)=>{
        if (event.type === 'click') {
            toggleIsCardEditing();
            cancelEdit(card,tempMemory);
        }
    });
    
    newInfoDiv.querySelector('#title-input').addEventListener('input', (event)=>{
        checkCardInput();
    });

    newInfoDiv.querySelector('#content-input').addEventListener('input', (event)=>{
        checkCardInput();
    });
}

// 수정사항 반영
async function confirmEdit(card, cardId){
    const titleInput = card.querySelector('#title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = card.querySelector('#content-input');
    const contentValue = contentInput.value.trim();
    let columnId = card.parentElement.id;
    card.remove();
    await renderTemplate('./html/card_template.html', 'card-template', columnId, {cardId:cardId, title:titleValue, content:contentValue,});
    saveData();
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

// 카드 이동 시작
export function startDragCard(event, original, clone, cardId) {
    toggleIsDragging();
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

// 카드 이동
export function moveCard(event, clone) {
    if (!getIsDragging() || !clone) return;

    clone.style.left = `${event.clientX-gapX}px`;
    clone.style.top = `${event.clientY-gapY}px`;
}

// 카드 예정 자리 이동
export function moveCardIllusion(event, newParent, clone) {
    if (!getIsDragging() || !clone) return;
    const columnArea = document.getElementById("column-area");
    [...columnArea.children].forEach((column)=> {
        let tempCard = column.querySelector(`#temp-${clone.id}`);
        if (tempCard) {
            tempCard.className = "temp-card"
            tempCard.style.display = 'none';
        }
    });
    let tempRealCard = newParent.querySelector(`#temp-${clone.id}`);
    let cardList = event.target.closest('.card-list');
    let closestCard = event.target.closest('.card-id');
    let closestTempCard = event.target.closest('.temp-card');
    if (cardList) {
        if (closestCard) {
            cardList.insertBefore(tempRealCard, closestCard);
        } else if (!closestTempCard){
            cardList.appendChild(tempRealCard);
        }
    }
    if (tempRealCard) {
        tempRealCard.className = "temp-card-true"
        tempRealCard.style.display = 'flex';
    }
}

// 카드 이동 종료
export function finishDragCard(clone) {
    if (!getIsDragging() || !clone) return ;

    const tempCards = document.querySelectorAll('.temp-card');
    [...tempCards].forEach((tempCard)=>tempCard.remove());
    const realCard = document.querySelector('.temp-card-true');
    realCard.id = "card-id"+draggingCardId;
    realCard.className = "card-id"
    realCard.style.opacity = 1;
    setEventForCard({"cardId": draggingCardId});

    toggleIsDragging();
    clone.remove();
    document.body.classList.remove('no-select');
    saveData();
}