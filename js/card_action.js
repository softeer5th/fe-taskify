import renderTemplate from "./main.js";

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

export function confirmAddCard(id){
    const titleInput = document.getElementById('title-input');
    const titleValue = titleInput.value.trim();
    const contentInput = document.getElementById('content-input');
    const contentValue = contentInput.value.trim();
    renderTemplate('./html/card_template.html', 'card-template', 'card-list'+id, {id:0, title:titleValue, content:contentValue,});
}
