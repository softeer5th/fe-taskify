import { createElement } from "../../../dom.js";
import createHistoryButton from "./createHistoryButton.js";
import createLeftHeader from "./createLeftHeader.js";

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createLeftHeader();
  const $historyButton = createHistoryButton();

  $header.append($leftHeader, $historyButton);
  return $header;
};

export default createHeader;
