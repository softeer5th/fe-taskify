import { Column } from "../components/column.js";


export function ColumnList({ columns, onAddCard, onDeleteCard, onUpdateCard }) {
  const container = document.createElement("div");
  container.className = "column-list";
  console.log(columns)
  columns.columns.forEach((column) => {
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
