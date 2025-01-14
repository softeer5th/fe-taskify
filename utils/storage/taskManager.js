import { addColumn, removeColumn } from "./columnManager.js";

export const getTaskByTimestamp = (columnKey, timestamp) => {
  const tasks = getColumnTasks(columnKey) || [];
  return tasks.find((task) => task.timestamp === timestamp);
};

export const getColumnTasks = (columnNumber) => {
  return JSON.parse(localStorage.getItem(columnNumber));
};

export const setDefaultColumn = () => {
  let columnCount = 1;
  while (getColumnTasks(`column${columnCount}`)) {
    removeColumn(`column${columnCount}`);
    columnCount++;
  }
  addColumn("해야할 일");
  addColumn("진행중인 일");
  addColumn("완료한 일");
};

export const addTask = (key, task) => {
  const storedTasks = getColumnTasks(key) || [];
  const updatedTasks = [...storedTasks, task];
  localStorage.setItem(key, JSON.stringify(updatedTasks));
};

export const removeTask = (key, taskTimestamp) => {
  const tasks = getColumnTasks(key) || [];
  const updatedTasks = tasks.filter(
    (task) => task.timestamp !== parseInt(taskTimestamp)
  );
  localStorage.setItem(key, JSON.stringify(updatedTasks));
};

export const editTask = (key, taskTimestamp, newTask) => {
  removeTask(key, taskTimestamp);
  addTask(key, newTask);
};

//num, num , num
export const moveTask = (taskTimestamp, columnNow, columnTogo) => {
  console.log(taskTimestamp, columnNow, columnTogo);
  const task = getTaskByTimestamp(columnNow, taskTimestamp);
  if (!task) return;
  removeTask(columnNow, taskTimestamp);
  addTask(columnTogo, task);
};
