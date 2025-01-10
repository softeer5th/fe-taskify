import { createElement } from "../../../dom.js";
import createSortButton from "./createSortButton.js";

const createLeftHeader = () => {
  const $leftHeader = createElement("div", { className: "left__header" });
  const $title = createElement("h1", {
    className: "display-bold24",
    text: "TASKIFY",
  });
  const $sortButton = createSortButton();

  $leftHeader.append($title, $sortButton);
  return $leftHeader;
};

export default createLeftHeader;
