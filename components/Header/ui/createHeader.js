import { createElement } from "../../../dom.js";
import HistoryButton from "../HistoryButton/HistoryButton.js";
import UserHistory from "../UserHistory/UserHistory.js";
import createLeftHeader from "./createLeftHeader.js";

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createLeftHeader();
  const $historyButton = HistoryButton();
  const $userHistory = UserHistory();

  $header.append($leftHeader, $historyButton, $userHistory);
  return $header;
};

export default createHeader;
