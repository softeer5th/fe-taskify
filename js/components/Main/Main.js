import TaskColumn from "../TaskColumn/TaskColumn.js";
import initialTaskData from "../../stores/initialTaskData.js";

export default function Main() {
  const $main = document.createElement("main");
  $main.classList.add("main");

  if (!localStorage.getItem("taskData")) {
    localStorage.setItem("taskData", JSON.stringify(initialTaskData));
  }

  const taskData = JSON.parse(localStorage.getItem("taskData"));

  taskData.forEach((column) => {
    $main.appendChild(
      TaskColumn({
        columnId: column.taskColumnId,
        columnTitle: column.taskColumnTitle,
        taskList: column.taskList,
      })
    );
  });

  return $main;
}
