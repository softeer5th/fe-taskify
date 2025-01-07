import { createDeleteModal, editTask } from "../script/task.js";

export function onEdit(e, card) {
    // 새로고침 방지
    e.preventDefault();
    const newTitle = e.target.title.value;
    const newContent = e.target.content.value;
    card.innerHTML = `
    <div class="card_text_container">
            <h4>${newTitle}</h4>
            <p>${newContent}</p>
        </div>
        <div class="card_button_container">
            <button>삭제</button>
            <button>수정</button>
        </div>
    `

    // 이벤트 새 등록
    const buttons = card.getElementsByTagName('button');
    const deleteButton = buttons[0];
    deleteButton.addEventListener('click', ()=>createDeleteModal(card));
    const editButton = buttons[1];
    editButton.addEventListener('click', ()=>editTask(card, newTitle, newContent));
}

export function onSubmit(e, idx) {
    // 새로고침 방지
    e.preventDefault();
    const self = e.target;
    const title = self.title.value;
    const content = self.content.value;

    const column = document.getElementsByClassName('card_list')[idx];

    // 새 카드 컴포넌트 생성
    const newCard = document.createElement('li')
    newCard.setAttribute('class', 'card')
    newCard.innerHTML = `
        <div class="card_text_container">
            <h4>${title}</h4>
            <p>${content}</p>
        </div>
        <div class="card_button_container">
            <button>삭제</button>
            <button>수정</button>
        </div>
    `

    // 이벤트 등록
    const buttons = newCard.getElementsByTagName('button');
    const deleteButton = buttons[0];
    deleteButton.addEventListener('click', ()=>createDeleteModal(newCard));
    const editButton = buttons[1];
    editButton.addEventListener('click', ()=>editTask(newCard, title, content));
    
    column.appendChild(newCard);

    // newCard 컴포넌트 삭제
    self.parentNode.removeChild(self);
}

export function onReset(e){
    // self = delete button
    const self = e.target;

    // form 삭제
    self.parentNode.parentNode.removeChild(self.parentNode);
}

export default function CardForm(idx) {
    return (
       `<form class="card_form">
            <input name="title" type="text"/>
            <input name="content" type="text"/>
            <button type="button">취소</button>
            <button type="submit">제출</button>
        </form>`
    )
}