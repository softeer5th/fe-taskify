// Tasks 저장
// key => column number
// value => task 객체들의 배열
// task => {"title": "~~" ,"body" : " !! " , " author " : " 나야 " , " timestamp" : " 222" }

// column 저장
// key => `column${columnCount}`
// value => column title

//기록해야할 행위들
// task 추가 - setTask
// task 삭제 - removeTask
// task 수정 - editTask
// task 이동 - moveTask
// column 추가 - addColumn
// column 삭제 - removeColumn
// column 수정 - editColumn
// 차순위 추가 구현사항  + column 이동?  - moveColumn

export const getTaskByTimestamp = (columnKey, timestamp) => {
  const tasks = getColumnTasks(columnKey) || [];
  return tasks.find(task => task.timestamp === timestamp);
}

export const getColumnTasks = (columnNumber) => {
  return JSON.parse(localStorage.getItem(columnNumber));
}

export const setDefaultColumn = () => {
  let columnCount = 1;
  while (getColumnTasks(`column${columnCount}`)) {
    removeColumn(`column${columnCount}`);
    columnCount++;
  }
  addColumn('해야할 일');
  addColumn('진행중인 일');
  addColumn('완료한 일');
}

export const addTask = (key, task) => {
  const storedTasks = getColumnTasks(key) || [];
  const updatedTasks = [...storedTasks, task];
  localStorage.setItem(key, JSON.stringify(updatedTasks));
}
export const removeTask = (key, taskTimestamp) => {
  const tasks = getColumnTasks(key) || [];
  const updatedTasks = tasks.filter(task => task.timestamp !== taskTimestamp);
  localStorage.setItem(key, JSON.stringify(updatedTasks));
}

export const editTask = (key, taskTimestamp, newTask) => {
  removeTask(key, taskTimestamp);
  addTask(key, newTask);
}

export const moveTask = (taskTimestamp, columnNow, columnTogo) => {
  const task = getTaskByTimestamp(columnNow, taskTimestamp);
  removeTask(columnNow, taskTimestamp);
  addTask(columnTogo, task);
}

export const addColumn = (columnTitle) => {
  let columnCount = 1;
  while (localStorage.getItem(`column${columnCount}`)) {
    columnCount++;
  }
  localStorage.setItem(`column${columnCount}`, JSON.stringify(columnTitle));
}

export const removeColumn = (columnNumber) => {
  localStorage.setItem(`column${columnNumber}`, localStorage.getItem(`column${columnNumber + 1}`));
  localStorage.setItem('columnNumber', getColumnTasks(columnNumber + 1))
  columnNumber++;
  while (getColumnTasks(columnNumber)) {
    localStorage.setItem(`column${columnNumber}`,
      localStorage.getItem(`column${columnNumber + 1}`));
    localStorage.setItem('columnNumber', getColumnTasks(columnNumber + 1))
    columnNumber++;
  }
}

export const editColumn = (columnNumber, content) => {
  localStorage.setItem(`column${columnNumber}`, content);
}

export const moveColumn = (now, togo) => {

}




