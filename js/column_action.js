import { overlay, createDeleteAllCardAlert, hideAlert } from "./alert.js";
import { checkCardInput, confirmAddCard } from "./card_action.js";  
import { addListener } from "./main.js";

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

    addListener(newDiv.querySelector('.confirm-button'), (event)=>{
        confirmAddCard(id);
        let curCard = childElement.querySelector('.new-card');
        curCard.remove();
    });

    addListener(newDiv.querySelector('.cancel-button'),(event)=>{
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

let sortingOrder = 1;
export let isMoving = false;

export function toggleSortOrder() {
    if (!isMoving) {
        sortingOrder *= -1;
        let chip = document.querySelector('.chip');
        if (sortingOrder==1) {
            chip.querySelector('div').textContent = "생성 순";
        } else {
            chip.querySelector('div').textContent = "최신 순";
        }
        isMoving = true;
        sortColumns();
        setTimeout(()=>{isMoving = false}, 500)
    }
}

function sortColumns() {
    let columns = document.getElementById("column-area").children;
    [...columns].forEach((column)=>{
        let cardList = [...column.querySelector(".card-list").children];
        let oldCardList = [...cardList];
        let positions = cardList.map(card => ({
            elementId: card.id,
            bfTop: card.getBoundingClientRect().top
        }));

        if (sortingOrder==1) {
            cardList.sort((a, b) => a.id.localeCompare(b.id));
        } else {
            cardList.sort((a, b) => b.id.localeCompare(a.id));
        }
        
        if (cardList.length>0) {
            cardList.forEach((card)=>{
                column.querySelector(".card-list").appendChild(card);
            });
            cardList.forEach((card)=>{
                let position = positions.find(position => position.elementId===card.id);
                position.aftTop = card.getBoundingClientRect().top;
            });
            cardList.forEach((card)=>{
                column.querySelector(".card-list").removeChild(card);
            });

            oldCardList.forEach((card)=>{
                column.querySelector(".card-list").appendChild(card);
                let position = positions.find(position => position.elementId===card.id);
                requestAnimationFrame(() => {
                    card.style.transform = `translateY(${position.aftTop-position.bfTop}px)`;
                });
            });

            setTimeout(() => {
                cardList.forEach(card => {
                    column.querySelector(".card-list").appendChild(card);
                    card.style.transform = ''; // transform 초기화
                });
            }, 500);
        } 
    });
}