export const addHistory = (
  timestamp,
  functionType, //ADD, DELETE, EDIT , MOVE
  title,
  column,
  ColumnTogo
) => {
  const history = {
    timestamp: timestamp, //num
    functionType: functionType, // string
    title: title, //str
    column: column, //str
    columnTogo: ColumnTogo, //str 없으면 "empty"
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
