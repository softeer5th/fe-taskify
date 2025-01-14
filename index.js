import { initStorage } from "./utils/localStorage.js";
import Main from "./Main.js";
import Header from "./components/Header/Header.js";
import { STORAGE_KEY } from "./constants/storageKey.js";

const todoList = initStorage(STORAGE_KEY.todoList);

const $root = document.getElementById("root");
$root.appendChild(Header());
$root.appendChild(Main(todoList));
