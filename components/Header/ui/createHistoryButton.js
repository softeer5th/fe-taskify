import { IMAGE } from "../../../assets/index.js";
import { createElement, createImg } from "../../../dom.js";

const createHistoryButton = () => {
  const $historyButton = createElement("button");
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $historyButton.appendChild($img);
  return $historyButton;
};

export default createHistoryButton;
