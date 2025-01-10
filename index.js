import { initStorage } from "./utils/localStorage.js";
import Main from "./Main.js";
import Header from "./components/Header/Header.js";

const todoList = initStorage();

const $root = document.getElementById("root");
$root.appendChild(Header());
$root.appendChild(Main(todoList));
