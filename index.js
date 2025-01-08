import Header from "./components/Header/Header.js";
import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { createElement } from "./dom.js";
import { todoList } from "./store/todoList.js";

const $ROOT = document.getElementById("root");
$ROOT.appendChild(Header());

const $main = createElement("main", { className: "column__section" });

todoList.forEach((todo) => {
  $main.appendChild(ColumnSection(todo));
});

$ROOT.appendChild($main);
