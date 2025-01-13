import { CardViewButtons } from "./buttons/cardViewButtons.js";
import { CardViewText } from "./text/cardViewText.js";

export const ViewCard = (columnId, card) => {
    // 모아서 Batch로 넣는 방식을 연구해라.
    const fragment = document.createDocumentFragment();
    fragment.appendChild(CardViewText(card));
    fragment.appendChild(CardViewButtons());
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.appendChild(fragment);

    return cardContainer;
}