import icons from "../../asset/icon.js";

const COUNT_MAX = 99;

export default function ColumnView({ column, count, state, onColumnTitleEvent, onAddButtonClicked, onColumnDeleteButtonClicked }) {
  const columnElement = document.createElement("div");
  columnElement.classList.add("column");
  columnElement.id = column.id;

  const columnTitle = document.createElement("div");
  columnTitle.classList.add("column__title");

  if (state === "editing") {
    columnTitle.classList.add("column__title-edit");

    const columnTextInput = document.createElement("input");
    columnTextInput.value = column.title;
    columnTextInput.classList.add("column__textarea-title");
    columnTextInput.maxLength = 50;
    columnTextInput.addEventListener("focusout", onColumnTitleEvent);

    columnTitle.appendChild(columnTextInput);
  } else {
    const columnTextarea = document.createElement("div");
    columnTextarea.classList.add("column__textarea");

    const columnTitleText = document.createElement("div");
    columnTitleText.textContent = column.title;
    columnTitleText.addEventListener("dblclick", onColumnTitleEvent);
    columnTitleText.classList.add("column__textarea-title");

    const columnTaskCount = document.createElement("div");
    columnTaskCount.classList.add("column__textarea-task-count");

    const columnTaskCountText = document.createElement("span");
    columnTaskCountText.textContent = count <= COUNT_MAX ? count : `${COUNT_MAX}+`;
    columnTaskCount.appendChild(columnTaskCountText);

    columnTextarea.appendChild(columnTitleText);
    columnTextarea.appendChild(columnTaskCount);

    columnTitle.appendChild(columnTextarea);
  }

  const columnAddButton = document.createElement("button");
  columnAddButton.classList.add("column__add-button");
  columnAddButton.appendChild(icons.plus());
  columnAddButton.addEventListener("click", onAddButtonClicked);

  const columnCloseButton = document.createElement("button");
  columnCloseButton.classList.add("column__close-button");
  columnCloseButton.appendChild(icons.closed());
  columnCloseButton.addEventListener("click", onColumnDeleteButtonClicked);

  columnTitle.appendChild(columnAddButton);
  columnTitle.appendChild(columnCloseButton);

  columnElement.appendChild(columnTitle);

  const columnTaskList = document.createElement("div");
  columnTaskList.classList.add("column__task-list");

  columnElement.appendChild(columnTaskList);

  return columnElement;
}
