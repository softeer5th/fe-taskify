import { onAddCard } from "../../action/stateActions.js";
import { CardList } from "../../container/cardList.js";
import { columnHeader } from "./header/columnHeader.js";

export function Column({ column, setState }) {
  const { id, cards } = column;
  const _columnHeader = columnHeader({ column, setState });
  const columnTemplate = document.createElement("div");
  columnTemplate.className = "column-template";
  columnTemplate.appendChild(_columnHeader);

  if (cards.length === 0) {
    return columnTemplate;
  }

  const cardList = document.createElement("ol");
  cardList.id = `list-${column.id}`;
  cardList.className = "column-card-list";
  cardList.appendChild(CardList({
    cards, columnId: id, setState
  }));


  columnTemplate.appendChild(cardList);

  return columnTemplate;
}
