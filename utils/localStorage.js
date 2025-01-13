import { initialTodoList } from "../store/todoList.js";

const STORAGE_KEY = "todoList";

export const saveLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const initStorage = () => {
  const storageData = loadLocalStorage();

  if (storageData === null) {
    saveLocalStorage(initialTodoList);
    return initialTodoList;
  }

  return sortInitStorage(storageData);
};

export const sortInitStorage = () => {
  const storageData = loadLocalStorage();

  const sortedList = [...storageData].map((section) => {
    section.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return section;
  });

  saveLocalStorage(sortedList);
  return sortedList;
};
