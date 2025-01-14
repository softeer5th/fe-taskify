import deleteTask from "../../../services/deleteTask.js";
import TaskCard from "../../TaskCard/TaskCard.js";

export default function TaskColumnBody({ columnId, taskList, taskEditCard }) {
  const $columnBody = document.createElement("ol");
  $columnBody.classList.add("task-column__body");

  if (taskEditCard) {
    $columnBody.appendChild(taskEditCard);
  }

  for (const { taskId, taskTitle, taskContent } of taskList) {
    console.log(taskId, taskTitle, taskContent);
    $columnBody.append(TaskCard({ columnId, taskId, taskTitle, taskContent }));
  }

  return $columnBody;
}
