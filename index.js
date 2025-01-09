import { initialTodoList } from "./store/todoList.js";
import { loadLocalStorage, saveLocalStorage } from "./utils/localStorage.js";
import App from "./App.js";

const init = () => {
  const storageData = loadLocalStorage();

  if (storageData === null) {
    saveLocalStorage(initialTodoList);
  }
};

init();

const todoList = loadLocalStorage();

const $ROOT = document.getElementById("root");
const app = new App($ROOT, todoList);
app.render();
