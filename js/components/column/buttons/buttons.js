import { deleteButton } from "./deleteButton.js";
import { plusButton } from "./plusButton.js";

export const buttons = (id, onAddCard) => {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(plusButton(id, onAddCard));
    buttonsDiv.appendChild(deleteButton());

    return buttonsDiv;
}