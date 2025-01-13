import { Column } from "../components/column/column.js";

export function ColumnList({ columnList, onAddCard, onDeleteCard, onUpdateCard }) {

  const container = document.createElement("div");
  container.className = "main-container";

  const { columns } = columnList;

  columns.forEach((column) => {
    const columnElement = Column({
      column,
      onAddCard,
      onDeleteCard,
      onUpdateCard,
    });
    container.appendChild(columnElement);
  });

  return container;

}
