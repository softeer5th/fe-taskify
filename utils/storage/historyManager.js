export const addHistory = (
  timestamp,
  functionIndex,
  task,
  newTask,
  columnNum,
  newColumnNum
) => {
  const history = {
    timestamp: timestamp,
    functionIndex: functionIndex,
    task: task,
    newTask: newTask,
    columnNum: columnNum,
    newColumnNum: newColumnNum,
  };

  const storedHistory = getHistory() || [];
  const updatedHistory = [...storedHistory, history];
  localStorage.setItem("history", JSON.stringify(updatedHistory));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history"));
};

export const clearHistory = () => {
  localStorage.removeItem("history");
};
