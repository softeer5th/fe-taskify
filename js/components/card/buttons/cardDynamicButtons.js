import { CancelButton } from "./cancelButton.js";
import { SaveButton } from "./saveButton.js";

export const CardDynamicButtons = () => {

    const cardButtonContainer = document.createElement("div");
    cardButtonContainer.className = "card-button-container";

    cardButtonContainer.appendChild(CancelButton());
    cardButtonContainer.appendChild(SaveButton());

    return cardButtonContainer;
}