import { initStorage } from "./utils/localStorage.js";
import Main from "./Main.js";
import Header from "./components/Header/Header.js";
import { STORAGE_KEY } from "./constants/storageKey.js";
import {
  addModalEventListener,
  addRootEventListener,
} from "./handlers/index.js";
import ColumnAddButton from "./components/ColumnAddButton/ColumnAddButton.js";

const todoList = initStorage(STORAGE_KEY.todoList);

const $root = document.getElementById("root");
$root.append(Header(), Main(todoList), ColumnAddButton());

addRootEventListener();
addModalEventListener();
