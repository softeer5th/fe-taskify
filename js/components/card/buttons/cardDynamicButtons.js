import { CancelButton } from "./cancelButton.js";
import { SaveButton } from "./saveButton.js";

export const CardDynamicButtons = (cardId, columnId) => {

    const cardButtonContainer = document.createElement("div");
    cardButtonContainer.className = "card-button-container";

    cardButtonContainer.appendChild(CancelButton(cardId, columnId));
    cardButtonContainer.appendChild(SaveButton(cardId, columnId));

    return cardButtonContainer;
}