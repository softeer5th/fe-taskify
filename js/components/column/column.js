import { onAddCard } from "../../action/stateActions.js";
import { CardList } from "../../container/cardList.js";
import { columnHeader } from "./header/columnHeader.js";

export function Column({ column, setState }) {
  const { id, cards } = column;
  const _columnHeader = columnHeader({ column, setState });
  const columnTemplate = document.createElement("div");
  columnTemplate.className = "column-template";
  columnTemplate.appendChild(_columnHeader);
  const cardList = CardList({
    cards, columnId: id, setState
  })

  columnTemplate.appendChild(cardList);

  return columnTemplate;
}
