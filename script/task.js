import CardForm, { onEdit, onSubmit } from "../components/cardForm.js";
import Modal from "../components/modal.js";
import { createModalChildren } from "./modal.js";

export function createDeleteModal(card) {
    const body = document.getElementsByTagName("body")[0];
    const modalElement = createModalChildren('선택한 카드를 삭제할까요?', ()=>deleteTask(card))
    const modal = Modal(modalElement);
    body.appendChild(modal);
}

export function deleteTask(card) {
    card.parentNode.removeChild(card);
}

export function editTask(card, title, content) {
    card.innerHTML = CardForm(0);
    const inputs = card.getElementsByTagName('input');
    inputs[0].value = title;
    inputs[1].value = content;
    const form = card.getElementsByTagName('form')[0];
    form.addEventListener('submit', (e)=>{onEdit(e, card)})


}