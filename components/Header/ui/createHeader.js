import { IMAGE } from "../../../assets/index.js";
import { createElement, createImg } from "../../../dom.js";

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $title = createElement("h1", {
    className: "display-bold24",
    text: "TASKIFY",
  });
  const $historyButton = createElement("button");
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $historyButton.appendChild($img);
  $header.appendChild($title);
  $header.appendChild($historyButton);

  return $header;
};

export default createHeader;
