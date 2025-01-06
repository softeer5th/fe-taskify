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

