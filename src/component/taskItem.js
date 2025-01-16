import icons from "../../asset/icon.js";

import Button from "./button.js";

export default function TaskItem({ task, onDeleteButtonClick, onEditButtonClick }) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.id = task.id;

  const contentElement = document.createElement("div");
  contentElement.classList.add("task__content");

  const contentBody = document.createElement("div");
  contentBody.classList.add("task__content-body");

  const titleElement = document.createElement("h3");
  titleElement.classList.add("task__content-title");
  titleElement.textContent = task.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("task__content-description");
  descriptionElement.textContent = task.description;

  contentBody.appendChild(titleElement);
  contentBody.appendChild(descriptionElement);

  const contentDevice = document.createElement("span");
  contentDevice.classList.add("task__content-device");
  contentDevice.textContent = `author by ${task.device}`;

  contentElement.appendChild(contentBody);
  contentElement.appendChild(contentDevice);

  const buttonGroupElement = document.createElement("div");
  buttonGroupElement.classList.add("task__iconButton");

  const deleteButtonElement = Button({
    className: ["iconButton", "iconButton-danger"],
    onClick: onDeleteButtonClick,
    children: [icons.closed()],
  });
  deleteButtonElement.addEventListener("mousedown", (event) => event.stopPropagation());

  const editButtonElement = Button({
    className: ["iconButton"],
    onClick: onEditButtonClick,
    children: [icons.edit()],
  });
  editButtonElement.addEventListener("mousedown", (event) => event.stopPropagation());

  buttonGroupElement.appendChild(deleteButtonElement);
  buttonGroupElement.appendChild(editButtonElement);

  taskElement.appendChild(contentElement);
  taskElement.appendChild(buttonGroupElement);

  return taskElement;
}
