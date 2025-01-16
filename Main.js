import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { ACTION_TYPE } from "./constants/action.js";
import { createElement } from "./dom.js";
import todoStore from "./store/TodoStore.js";

const Main = (todoList) => {
  const $main = createElement("main", { className: "column__main" });

  const $columnSectionList = todoList?.map((todo) => ColumnSection(todo));

  $main.append(...$columnSectionList);
  return $main;
};

export default Main;

todoStore.subscribe((action, { newColumn }) => {
  if (action === ACTION_TYPE.columnAdd) {
    const $main = document.querySelector(".column__main");

    $main.appendChild(ColumnSection(newColumn));
    $main.scrollTo({ left: $main.scrollWidth, behavior: "smooth" });
  }
});
