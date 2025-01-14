import { Column } from "../components/column/column.js";

export function ColumnList({ columnList, setState }) {

  const container = document.createElement("div");
  container.className = "main-container";

  const { columns } = columnList;

  columns.forEach((column) => {
    const columnElement = Column({
      column,
      setState
    });
    container.appendChild(columnElement);
  });

  return container;

}
