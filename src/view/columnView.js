import { plus } from "../../public/plus.js";
import { closed } from "../../public/closed.js";

const COUNT_MAX = 99;

export function ColumnView({ column, count, state, onAddButtonClicked, onColumnTitleClicked, onColumnDeleteButtonClicked }) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("column");
  columnElement.id = column.id;

  if (state === "default") {
    const columnTitle = document.createElement("div");
    columnTitle.classList.add("column__title");

    const columnTextarea = document.createElement("div");
    columnTextarea.classList.add("column__textarea");

    const columnTitleText = document.createElement("div");
    columnTitleText.textContent = column.title;
    columnTitleText.addEventListener("dblclick", onColumnTitleClicked);
    columnTitleText.classList.add("column__textarea-title");

    const columnTaskCount = document.createElement("div");
    columnTaskCount.classList.add("column__textarea-task-count");

    const columnTaskCountText = document.createElement("span");
    columnTaskCountText.textContent = count <= COUNT_MAX ? count : `${COUNT_MAX}+`;
    columnTaskCount.appendChild(columnTaskCountText);

    columnTextarea.appendChild(columnTitleText);
    columnTextarea.appendChild(columnTaskCount);

    const columnAddButton = document.createElement("button");
    columnAddButton.innerHTML = plus;
    columnAddButton.addEventListener("click", onAddButtonClicked);
    columnAddButton.classList.add("column__add-button");

    const columnCloseButton = document.createElement("button");
    columnCloseButton.innerHTML = closed;
    columnCloseButton.addEventListener("click", onColumnDeleteButtonClicked);
    columnCloseButton.classList.add("column__close-button");

    columnTitle.appendChild(columnTextarea);
    columnTitle.appendChild(columnAddButton);
    columnTitle.appendChild(columnCloseButton);

    columnElement.appendChild(columnTitle);
  }

  return columnElement;
}
