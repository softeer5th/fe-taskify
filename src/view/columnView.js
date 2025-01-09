import { plus } from "../../public/plus.js";
import { closed } from "../../public/closed.js";

export function ColumnView({ column, state, onAddButtonClicked, onColumnTitleClicked }) {
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
    columnTaskCountText.textContent = "0";
    columnTaskCount.appendChild(columnTaskCountText);

    columnTextarea.appendChild(columnTitleText);
    columnTextarea.appendChild(columnTaskCount);

    const columnAddButton = document.createElement("button");
    columnAddButton.innerHTML = plus;
    columnAddButton.addEventListener("click", onAddButtonClicked);
    columnAddButton.classList.add("column__add-button");

    const columnCloseButton = document.createElement("button");
    columnCloseButton.innerHTML = closed;
    columnCloseButton.classList.add("column__close-button");

    columnTitle.appendChild(columnTextarea);
    columnTitle.appendChild(columnAddButton);
    columnTitle.appendChild(columnCloseButton);

    columnElement.appendChild(columnTitle);
  }

  return columnElement;
}
