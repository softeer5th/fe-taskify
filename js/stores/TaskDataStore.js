export function setTaskData(data) {
  localStorage.setItem("taskData", JSON.stringify(data));
}

export function getTaskData() {
  return JSON.parse(localStorage.getItem("taskData")) || [];
}

class TaskDataStore {
  editTask({ columnId, taskId, taskTitle, taskContent }) {
    const taskData = getTaskData();
    const columnIndex = taskData.findIndex(
      (column) => column.taskColumnId === columnId
    );

    if (columnIndex !== -1) {
      const taskList = taskData[columnIndex].taskList;
      const taskIndex = taskList.findIndex((task) => task.taskId === taskId);

      if (taskIndex !== -1) {
        // task 데이터 업데이트
        taskData[columnIndex].taskList[taskIndex] = {
          ...taskList[taskIndex],
          taskTitle,
          taskContent,
        };

        // 로컬스토리지 업데이트
        setTaskData(taskData);
      }
    }
  }
}

export default new TaskDataStore();
