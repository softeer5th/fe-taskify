import { ClosedButton } from "./closedButton.js";
import { EditButton } from "./editButton.js";

export const CardViewButtons = () => {
    const fragment = document.createDocumentFragment();
    const cardViewButtons = document.createElement("div");
    cardViewButtons.className = "card-view-buttons";

    cardViewButtons.appendChild(ClosedButton());
    cardViewButtons.appendChild(EditButton());
    fragment.appendChild(cardViewButtons)
    return fragment;
}