import { CardList } from "../../container/cardList.js";
import { createComponent } from "../../global/createComponent.js";
import { columnHeader } from "./header/columnHeader.js";

export function Column({ column, onAddCard, onDeleteCard, onUpdateCard }) {
  const { id, cards } = column;
  console.log(column)
  const _columnHeader = columnHeader({ column, onAddCard });

  const columnTemplate = document.createElement("div");
  columnTemplate.className = "column-template";
  columnTemplate.appendChild(_columnHeader);

  if (cards.length === 0) {
    return columnTemplate;
  }

  const cardList = document.createElement("ol");
  cardList.id = `list-${column.id}`;
  cardList.className = "column-card-list";
  cardList.appendChild(CardList({ cards, id, onDeleteCard, onUpdateCard }));


  columnTemplate.appendChild(cardList);

  return columnTemplate;
}
