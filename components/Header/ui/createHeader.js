import { IMAGE } from "../../../assets/index.js";
import { createElement, createImg } from "../../../dom.js";
import createSortButton from "./createSortButton.js";

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createElement("div", { className: "left__header" });
  const $title = createElement("h1", {
    className: "display-bold24",
    text: "TASKIFY",
  });

  const $sortButton = createSortButton();

  const $historyButton = createElement("button");
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $leftHeader.append($title, $sortButton);
  $historyButton.appendChild($img);
  $header.append($leftHeader, $historyButton);

  return $header;
};

export default createHeader;
