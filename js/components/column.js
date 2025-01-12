import { CardList } from "../container/cardList.js";


export function Column({ column, onAddCard, onDeleteCard, onUpdateCard }) {
  const container = document.createElement("div");
  container.className = "column";
  const title = document.createElement("h2");
  title.textContent = column.title;

  const addCardButton = document.createElement("button");
  addCardButton.textContent = "Add Card";
  addCardButton.addEventListener("click", () => {
    const cardTitle = prompt("Enter card title:");
    if (cardTitle) {
      onAddCard(column.id, { title: cardTitle, content: "", date: new Date() });
    }
  });

  const cardList = CardList({
    cards: column.cards,
    columnId: column.id,
    onDeleteCard,
    onUpdateCard,
  });

  container.appendChild(title);
  container.appendChild(addCardButton);
  container.appendChild(cardList);

  return container;
}
