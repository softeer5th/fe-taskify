import { overlay, createDeleteAllCardAlert, hideAlert } from "./alert.js";
import { checkCardInput, confirmAddCard } from "./card_action.js";  

export function addCard(id) {
    const parentElement = document.querySelector('#column-id'+id);
    const childElement = parentElement.querySelector("#card-list"+id);

    const newDiv = document.createElement('div');
    newDiv.className = 'new-card';
    newDiv.innerHTML = `
        <div class="card-info">
            <textarea id="title-input" class="card-title" maxlength="500" rows="1" placeholder="제목을 입력하세요"></textarea>
            <textarea id="content-input" class="card-content" maxlength="500" rows="1" placeholder="내용을 입력하세요" /></textarea>
        </div>
        <div class="action-buttons">
            <button class="cancel-button">
                취소
            </button>
            <div style="width:10px"></div>
            <button class="confirm-button" disabled>
                등록    
            </button>
        </div>
    `;

    newDiv.querySelector('.confirm-button').addEventListener('click', (event)=> {
        confirmAddCard(id);
        let curCard = childElement.querySelector('.new-card');
        curCard.remove();
    });
    newDiv.querySelector('.cancel-button').addEventListener('click', (event)=> {
        let curCard = childElement.querySelector('.new-card');
        curCard.remove();
    });
    newDiv.querySelector('#title-input').addEventListener('input', (event)=>{
        checkCardInput();
    });
    newDiv.querySelector('#content-input').addEventListener('input', (event)=>{
        checkCardInput();
    });

    let newCard = childElement.querySelector('.new-card');
    if (newCard) {
        newCard.remove();
    } else {
        childElement.prepend(newDiv);
    }
}


export function delAllCard(columnId) {
    overlay.style.display = "block";
    createDeleteAllCardAlert(columnId);
    let delAllCardAlert = document.getElementById(`deleteAllCardAlert-${columnId}`);
    delAllCardAlert.style.display = "block";
    delAllCardAlert.querySelector('.delObj').textContent = "칼럼의 모든 카드를 삭제하시겠습니까?";
    let cardList = document.getElementById("card-list"+columnId);

    delAllCardAlert.querySelector('#cancel-delete-all-button').addEventListener('click',(event)=>{
        hideAlert();
    });
    delAllCardAlert.querySelector('#confirm-delete-all-button').addEventListener('click',(event)=>{
        overlay.style.display = "none";
        hideAlert();
        cardList.innerHTML = ``;
    });
}

export function updateChildCount(parentElement) {
    const countDisplay = parentElement.querySelector('.card-count');
    let cardList = parentElement.querySelector('.card-list')
    let childCount = cardList.children.length;
    
    if (parseInt(childCount)>99) {
        countDisplay.textContent = "99+";
    } else {
        countDisplay.textContent = childCount;
    }
}