import { initStorage } from "./utils/localStorage.js";
import App from "./App.js";

const todoList = initStorage();

const $ROOT = document.getElementById("root");
const app = new App($ROOT, todoList);
app.render();
