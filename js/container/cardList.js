import { Card } from "../components/card.js";

export function CardList({ cards, columnId, onDeleteCard, onUpdateCard }) {
  const container = document.createElement("div");
  container.className = "card-list";

  cards.forEach((card) => {
    const cardElement = Card({
      card,
      columnId,
      onDeleteCard,
      onUpdateCard,
    });
    container.appendChild(cardElement);
  });

  return container;
}
