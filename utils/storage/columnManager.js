import { getColumnTasks } from "./taskManager.js";

export const addColumn = (columnTitle) => {
  let columnCount = 1;
  while (localStorage.getItem(`column${columnCount}`)) {
    columnCount++;
  }
  localStorage.setItem(`column${columnCount}`, JSON.stringify(columnTitle));
};

export const removeColumn = (columnNumber) => {
  localStorage.setItem(
    `column${columnNumber}`,
    JSON.stringify(localStorage.getItem(`column${columnNumber + 1}`))
  );
  localStorage.setItem(
    "columnNumber",
    JSON.stringify(getColumnTasks(columnNumber + 1))
  );
  columnNumber++;
  while (getColumnTasks(columnNumber)) {
    localStorage.setItem(
      `column${columnNumber}`,
      JSON.stringify(localStorage.getItem(`column${columnNumber + 1}`))
    );
    localStorage.setItem(
      "columnNumber",
      JSON.stringify(getColumnTasks(columnNumber + 1))
    );
    columnNumber++;
  }
};

export const editColumn = (columnNumber, content) => {
  localStorage.setItem(`column${columnNumber}`, JSON.stringify(content));
};

export const moveColumn = (now, togo) => {};
