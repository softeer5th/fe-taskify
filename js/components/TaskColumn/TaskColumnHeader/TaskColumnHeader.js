import Button from "../../Button/Button.js";
import createImg from "../../../utils/createImg.js";

export default function TaskColumnHeader({
  columnTitle,
  taskListLength,
  onAddTask,
  onDeleteColumn,
}) {
  const $columnHeader = document.createElement("div");
  $columnHeader.classList.add("task-column__header");

  /** (columnInfo) -> (columnTitle), (columnTasksNum) */
  const $columnInfo = document.createElement("div");
  $columnInfo.classList.add("task-column__info");

  const $columnTitle = document.createElement("div");
  $columnTitle.classList.add("display-bold16", "text-bold");
  $columnTitle.innerText = columnTitle;

  const $columnTasksNum = document.createElement("div");
  $columnTasksNum.classList.add(
    "task-column__tasks-num",
    "border-default",
    "text-weak",
    "display-medium12"
  );
  $columnTasksNum.innerText = taskListLength;

  /** (columnButtonWrapper) -> (addTaskButton), (deleteColumnButton) */
  const $columnButtonsWrapper = document.createElement("div");
  $columnButtonsWrapper.classList.add("task-column__buttons-wrapper");

  const $addTaskButton = Button({
    format: "icon",
    children: createImg({
      src: "/assets/icons/plus.svg",
      alt: "task add button",
    }),
    onClick: onAddTask,
  });

  const $deleteColumnButton = Button({
    format: "icon",
    children: createImg({
      src: "/assets/icons/closed.svg",
    }),
    onClick: onDeleteColumn,
  });

  $columnInfo.append($columnTitle, $columnTasksNum);
  $columnButtonsWrapper.append($addTaskButton, $deleteColumnButton);
  $columnHeader.append($columnInfo, $columnButtonsWrapper);

  return $columnHeader;
}
