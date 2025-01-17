import ColumnHeader from "../component/columnHeader.js";
import EditColumnHeader from "../component/editColumnHeader.js";

export default function ColumnView({ column, count, state, onColumnTitleEvent, onClickAddButton, onClickColumnDeleteButton }) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("column");
  columnElement.id = column.id;

  const columnHeader =
    state === "editing"
      ? EditColumnHeader({
          column,
          onFocusOutColumnTitle: onColumnTitleEvent,
          onClickTaskAddButton: onClickAddButton,
          onClickColumnDeleteButton,
        })
      : ColumnHeader({
          column,
          count,
          onDblClickColumnTitle: onColumnTitleEvent,
          onClickTaskAddButton: onClickAddButton,
          onClickColumnDeleteButton,
        });

  const columnTaskList = document.createElement("div");
  columnTaskList.classList.add("column__task-list");

  columnElement.appendChild(columnHeader);
  columnElement.appendChild(columnTaskList);

  return columnElement;
}
