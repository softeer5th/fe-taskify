import { createCardElement } from "../template/card.js";

export const addColumnEventListener = (columnElement, index) => {
    columnElement.addEventListener("click", (e) => {
        if (e.target && e.target.closest("button")?.classList.contains("column-header-plus-button")) {
            const cardListElement = document.getElementById(`list-${index}`);
            const cardElement = createCardElement(index);
            cardListElement.appendChild(cardElement);
        }
    }, false);
}