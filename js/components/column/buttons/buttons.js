import { deleteButton } from "./deleteButton.js";
import { plusButton } from "./plusButton.js";

export const buttons = () => {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(plusButton());
    buttonsDiv.appendChild(deleteButton());

    return buttonsDiv;
}