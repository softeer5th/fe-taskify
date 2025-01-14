import { CardViewButtons } from "./buttons/cardViewButtons.js";
import { CardViewText } from "./text/cardViewText.js";

export const ViewCard = (card) => {
    // 모아서 Batch로 넣는 방식을 연구해라.
    const fragment = document.createDocumentFragment();
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-view-template";
    cardContainer.appendChild(CardViewText(card));
    cardContainer.appendChild(CardViewButtons());
    fragment.appendChild(cardContainer);

    return fragment;
}