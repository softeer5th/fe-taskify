import { getTaskData, setTaskData } from "../stores/TaskDataStore.js";

export default function deleteTask({ taskId }) {
  const taskData = getTaskData();

  const columnIndex = taskData.findIndex((column) =>
    column.taskList.some((task) => task.taskId === taskId)
  );

  if (columnIndex !== -1) {
    taskData[columnIndex].taskList = taskData[columnIndex].taskList.filter(
      (task) => task.taskId !== taskId
    );

    setTaskData(taskData);
  }
}
