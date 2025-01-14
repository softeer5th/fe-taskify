import { CardViewAuthor } from "./cardAuthor.js";
import { CardViewContent } from "./cardContent.js";
import { CardViewTitle } from "./cardTitle.js";

export const CardViewText = (card) => {

    const { title, content, author } = card;
    const cardViewText = document.createElement("div");
    cardViewText.className = "card-view-text";

    cardViewText.appendChild(CardViewTitle(title));
    cardViewText.appendChild(CardViewContent(content));
    cardViewText.appendChild(CardViewAuthor(author));

    return cardViewText;
}