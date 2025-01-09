import Header from "./components/Header/Header.js";
import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { createElement } from "./dom.js";
import { initialTodoList } from "./store/todoList.js";
import { loadLocalStorage, saveLocalStorage } from "./utils/localStorage.js";

const init = () => {
  const storageData = loadLocalStorage();

  if (storageData === null) {
    saveLocalStorage(initialTodoList);
  }
};

const $ROOT = document.getElementById("root");
$ROOT.appendChild(Header());

const $main = createElement("main", { className: "column__section" });

init();

const todoList = loadLocalStorage() || initialTodoList;

todoList.forEach((todo) => {
  $main.appendChild(ColumnSection(todo));
});

$ROOT.appendChild($main);
