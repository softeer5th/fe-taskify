const STORAGE_KEY = "todoList";

export const saveLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
