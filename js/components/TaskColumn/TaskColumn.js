import createImg from "../../utils/createImg.js";
import Button from "../Button/Button.js";
import TaskCard from "../TaskCard/TaskCard.js";
import TaskEditCard from "../TaskCard/TaskEditCard.js";

export default function TaskColumn({ title, tasks = [1, 2, 3] }) {
  const column = document.createElement("div");
  column.classList.add("task-column");

  /** (columnHeader) -> (columnInfo), (columnButtonsWrapper) */
  const columnHeader = document.createElement("div");
  columnHeader.classList.add("task-column__header");

  /** (columnInfo) -> (columnTitle), (columnTasksNum) */
  const columnInfo = document.createElement("div");
  columnInfo.classList.add("task-column__info");

  const columnTitle = document.createElement("div");
  columnTitle.classList.add("display-bold16", "text-bold");
  columnTitle.innerText = title;

  const columnTasksNum = document.createElement("div");
  columnTasksNum.classList.add(
    "task-column__tasks-num",
    "border-default",
    "text-weak",
    "display-medium12"
  );
  columnTasksNum.innerText = tasks.length;

  /** (columnButtonWrapper) -> (addTaskButton), (deleteColumnButton) */
  const columnButtonsWrapper = document.createElement("div");
  columnButtonsWrapper.classList.add("task-column__buttons-wrapper");

  const taskEditCardInstance = TaskEditCard();
  const taskEditCard = taskEditCardInstance.taskEditCard;
  taskEditCard.style.display = "none";

  const addTaskHandler = () => {
    console.log("add task");
    taskEditCard.style.display = "block";
    taskEditCardInstance.showCard();
  };

  const deleteColumnHandler = () => {
    console.log("delete column");
  };

  const addTaskButton = Button({
    format: "icon",
    children: createImg({
      src: "/assets/icons/plus.svg",
      alt: "task add button",
    }),
    onClick: addTaskHandler,
  });

  const deleteColumnButton = Button({
    format: "icon",
    children: createImg({
      src: "/assets/icons/closed.svg",
    }),
    onClick: deleteColumnHandler,
  });

  columnInfo.append(columnTitle, columnTasksNum);
  columnButtonsWrapper.append(addTaskButton, deleteColumnButton);
  columnHeader.append(columnInfo, columnButtonsWrapper);
  column.append(columnHeader, taskEditCard);

  for (const taskId of tasks) {
    column.append(TaskCard({ id: taskId }));
  }

  return column;
}
