import { Card } from "../components/card/card.js";
import { createComponent } from "../global/createComponent.js";

export function CardList({ cards, columnId, onDeleteCard, onUpdateCard }) {

  const cardContainer = document.createElement("ol");
  cardContainer.className = "column-card-list";
  console.log(cards)
  cards.forEach((card) => {
    const cardElement = Card({
      card,
      columnId,
      onDeleteCard,
      onUpdateCard,
    });
    cardContainer.appendChild(cardElement);
  });

  return cardContainer;
}
