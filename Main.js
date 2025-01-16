import ColumnSection from "./components/ColumnSection/ColumnSection.js";
import { createButton, createElement, createPlusSvg } from "./dom.js";

const Main = (todoList) => {
  const $main = createElement("main", { className: "column__section" });

  const $columnAddButton = createButton({
    className: "floating__button shadow-up",
  });
  const $plusSvg = createPlusSvg({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
  });

  $columnAddButton.appendChild($plusSvg);

  const $columnSectionList = todoList?.map((todo) => ColumnSection(todo));

  $main.append(...$columnSectionList, $columnAddButton);
  return $main;
};

export default Main;
