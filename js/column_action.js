import { checkCardInput, confirmAddCard } from "./card_action.js";

export function addCard(id) {
    const parentElement = document.querySelector('#column-id'+id);
    const childElement = parentElement.querySelector("#card-list"+id);

    const newDiv = document.createElement('div');
    newDiv.className = 'new-card';
    newDiv.innerHTML = `
        <div class="card-info">
            <input id="title-input" class="card-title" type="text" placeholder="제목을 입력하세요" />
            <input id="content-input" class="card-content" type="text" placeholder="내용을 입력하세요" />
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
    })
    newDiv.querySelector('#content-input').addEventListener('input', (event)=>{
        checkCardInput();
    })

    let newCard = childElement.querySelector('.new-card');
    if (newCard) {
        newCard.remove();
    } else {
        childElement.prepend(newDiv);
    }
}


export function delCard() {
    console.log("bye");
}
