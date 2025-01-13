import TaskCard from "../components/TaskCard/TaskCard.js";
import { getTaskData, setTaskData } from "../stores/TaskDataStore.js";

export default function saveTask({
  columnId,
  taskId,
  taskTitle,
  taskContent,
  taskEditCard,
}) {
  const taskData = getTaskData();
  const columnIndex = taskData.findIndex(
    (column) => column.taskColumnId === columnId
  );

  if (columnIndex === -1) return;

  // taskId가 있으면 기존 task 수정
  if (taskId) {
    const taskIndex = taskData[columnIndex].taskList.findIndex(
      (task) => task.taskId === taskId
    );
    console.log("taskindex: ", taskIndex);
    if (taskIndex !== -1) {
      taskData[columnIndex].taskList[taskIndex].taskTitle = taskTitle;
      taskData[columnIndex].taskList[taskIndex].taskContent = taskContent;
    }
  } else {
    const newTask = {
      taskId: Date.now(),
      taskTitle,
      taskContent,
    };
    taskData[columnIndex].taskList.push(newTask);
  }

  setTaskData(taskData);

  const $taskColumnBody = taskEditCard.closest(".task-column__body");
  const $taskCard = TaskCard({
    taskId: taskId || Date.now(),
    taskTitle,
    taskContent,
  });

  // taskId가 있으면 기존 카드를 교체, 없으면 새로 추가
  if (taskId) {
    taskEditCard.replaceWith($taskCard);
  } else {
    $taskColumnBody.appendChild($taskCard);
  }
}
