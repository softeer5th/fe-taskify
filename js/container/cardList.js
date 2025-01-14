import { onDeleteCard, onUpdateCard } from "../action/stateActions.js";
import { Card } from "../components/card/card.js";

export function CardList({ cards, columnId, setState }) {

  const cardContainer = document.createElement("ol");

  cardContainer.className = "column-card-list";
  cards.forEach((card) => {
    const { id } = card;
    const onCardDelete = () => onDeleteCard(columnId, id, setState);
    const onCardUpdate = (cardData) => onUpdateCard(columnId, id, cardData, setState)
    console.log(card)
    const cardElement = Card({
      card,
      onCardDelete,
      onCardUpdate,
    });
    cardContainer.appendChild(cardElement);
  });

  return cardContainer;
}
