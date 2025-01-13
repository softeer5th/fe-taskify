import { createElement } from "../../../dom.js";
import createHistoryButton from "./createHistoryButton.js";
import createLeftHeader from "./createLeftHeader.js";
import createUserHistory from "./createUserHistory.js";

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createLeftHeader();
  const $historyButton = createHistoryButton();
  const $userHistory = createUserHistory();

  $header.append($leftHeader, $historyButton, $userHistory);
  return $header;
};

export default createHeader;
