import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { createElement } from "./dom.js";

const Main = (todoList) => {
  const $main = createElement("main", { className: "column__section" });

  todoList?.forEach((todo) => {
    $main.appendChild(ColumnSection(todo));
  });

  return $main;
};

export default Main;
