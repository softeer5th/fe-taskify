import { initialTodoList } from "../store/todoList.js";

export const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const initStorage = (key) => {
  const storageData = loadLocalStorage(key);

  if (storageData === null) {
    saveLocalStorage(key, initialTodoList);
    return initialTodoList;
  }

  return sortInitStorage(key, storageData);
};

export const sortInitStorage = (key, storageData) => {
  const sortedList = [...storageData].map((section) => {
    section.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return section;
  });

  saveLocalStorage(key, sortedList);
  return sortedList;
};

export const clearLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
