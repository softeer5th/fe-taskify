import createTitleContainer from "./components/ColumnSection/ColumnHeader/ui/createTitleContainer.js";
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

todoStore.subscribe(
  (action, { newColumn, todoList, sectionId, columnTitle }) => {
    const $main = document.querySelector(".column__main");

    switch (action) {
      case ACTION_TYPE.columnAdd:
        $main.appendChild(ColumnSection(newColumn));
        $main.scrollTo({ left: $main.scrollWidth, behavior: "smooth" });
        break;

      case ACTION_TYPE.columnDelete:
        const $columnSectionList = todoList?.map((todo) => ColumnSection(todo));
        $main.replaceChildren(...$columnSectionList);
        break;

      case ACTION_TYPE.columnUpdate:
        const $titleContainer = $main.querySelector(
          `#${sectionId} .column__header__titleContainer`
        );
        const count = $titleContainer.lastElementChild.textContent;

        const $newTitleContainer = createTitleContainer({
          title: columnTitle,
          count,
        });
        $titleContainer.replaceWith($newTitleContainer);
        break;
    }
  }
);
