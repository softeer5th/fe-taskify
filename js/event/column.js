import { createCardElement } from "../template/card.js";

export const addColumnEventListener = (columnElement) => {
    columnElement.addEventListener("click", (e) => {
        if (e.target && e.target.closest("button")?.classList.contains("column-header-plus-button")) {
            const cardListElement = e.target.closest(".column-template").querySelector(".column-card-list");
            const cardElement = createCardElement();
            cardListElement.appendChild(cardElement);
        }
    }, false);
}