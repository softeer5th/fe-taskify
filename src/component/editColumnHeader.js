import icons from "../../asset/icon.js";

import Button from "../component/button.js";

export default function EditColumnHeader({ column, onFocusOutColumnTitle, onClickTaskAddButton, onClickColumnDeleteButton }) {
  const columnHeaderElement = document.createElement("div");
  columnHeaderElement.classList.add("column__header");

  const columnTitle = document.createElement("div");
  columnTitle.classList.add("column__title");

  const columnTitleText = document.createElement("input");
  columnTitleText.classList.add("column__title-text");
  columnTitleText.textContent = column.title;
  columnTitleText.maxLength = 50;
  columnTitleText.addEventListener("focusout", onFocusOutColumnTitle);

  columnTitle.appendChild(columnTitleText);

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
