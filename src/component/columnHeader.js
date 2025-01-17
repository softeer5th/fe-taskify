import icons from "../../asset/icon.js";

import Button from "../component/button.js";

const COUNT_MAX = 99;

export default function ColumnHeader({ column, count, onDblClickColumnTitle, onClickTaskAddButton, onClickColumnDeleteButton }) {
  const columnHeaderElement = document.createElement("div");
  columnHeaderElement.classList.add("column__header");

  const columnTitle = document.createElement("div");
  columnTitle.classList.add("column__title");

  const columnTitleText = document.createElement("h3");
  columnTitleText.classList.add("column__title-text");
  columnTitleText.textContent = column.title;
  columnTitleText.addEventListener("dblclick", onDblClickColumnTitle);

  const columnTaskCount = document.createElement("div");
  columnTaskCount.classList.add("column__title-task-count");

  const columnTaskCountText = document.createElement("span");
  columnTaskCountText.textContent = count <= COUNT_MAX ? count : `${COUNT_MAX}+`;
  columnTaskCount.appendChild(columnTaskCountText);

  columnTitle.appendChild(columnTitleText);
  columnTitle.appendChild(columnTaskCount);

  const columnTitleButton = document.createElement("div");
  columnTitleButton.classList.add("column__title-button");

  const taskAddButton = Button({
    className: ["iconButton"],
    onClick: onClickTaskAddButton,
    children: [icons.plus()],
  });
  const columnDeleteButton = Button({
    className: ["iconButton", "iconButton-danger"],
    onClick: onClickColumnDeleteButton,
    children: [icons.closed()],
  });

  columnTitleButton.appendChild(taskAddButton);
  columnTitleButton.appendChild(columnDeleteButton);

  columnHeaderElement.appendChild(columnTitle);
  columnHeaderElement.appendChild(columnTitleButton);

  return columnHeaderElement;
}
