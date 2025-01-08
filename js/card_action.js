import renderTemplate from "./main.js";
import { element, delCardAlert } from "./alert.js";

export function checkCardInput() {
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    const confirmBtn = document.querySelector('.confirm-button');
    if (titleValue!=='' && contentValue!=='') {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

export function confirmAddCard(columnId){
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    const newCardId = document.getElementById('card-list'+columnId).childElementCount;
    renderTemplate('./html/card_template.html', 'card-template', 'card-list'+columnId, {columnId: columnId, cardId:newCardId, title:titleValue, content:contentValue,});
}


export function delCard(columnId, cardId) {
    element.style.display = "block";
    delCardAlert.style.display = "block";
    let column = document.getElementById("card-list"+columnId);
    let card = column.querySelector("#card-id"+cardId);
    delCardAlert.querySelector('.delObj').textContent = "선택한 카드를 삭제할까요?";
    delCardAlert.querySelector('#cancel-delete-card-button').addEventListener('click',(event)=>{
        element.style.display = "none";
        delCardAlert.style.display = "none";
    });
    delCardAlert.querySelector('#confirm-delete-card-button').addEventListener('click',(event)=>{
        element.style.display = "none";
        delCardAlert.style.display = "none";
        if (column.contains(card)) {
            column.removeChild(card);
        }
    });
}
