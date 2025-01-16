import icons from "../../asset/icon.js";

export default function TaskItem({ task, onDeleteButtonClick, onEditButtonClick }) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.id = task.id;

  const contentElement = document.createElement("div");
  contentElement.classList.add("task__content");

  const titleElement = document.createElement("h3");
  titleElement.classList.add("task__content-title");
  titleElement.textContent = task.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("task__content-description");
  descriptionElement.textContent = task.description;

  contentElement.appendChild(titleElement);
  contentElement.appendChild(descriptionElement);

  const buttonGroupElement = document.createElement("div");
  buttonGroupElement.classList.add("task__iconButton");

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.classList.add("task__iconButton-icon");
  deleteButtonElement.appendChild(icons.closed());
  deleteButtonElement.addEventListener("click", onDeleteButtonClick);
  deleteButtonElement.addEventListener("mousedown", (event) => event.stopPropagation());

  const editButtonElement = document.createElement("button");
  editButtonElement.classList.add("task__iconButton-icon");
  editButtonElement.appendChild(icons.edit());
  editButtonElement.addEventListener("click", onEditButtonClick);
  editButtonElement.addEventListener("mousedown", (event) => event.stopPropagation());

  buttonGroupElement.appendChild(deleteButtonElement);
  buttonGroupElement.appendChild(editButtonElement);

  taskElement.appendChild(contentElement);
  taskElement.appendChild(buttonGroupElement);

  return taskElement;
}
