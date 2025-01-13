import { createElement } from "../../../dom.js";

import HistoryItem from "./HistoryItem.js";

const createHistoryMain = ({ histories }) => {
  const $historyMain = createElement("ul", { className: "history__main" });

  const $emptyHistory = createElement("div", {
    className: "empty__history",
  });

  const $emptyHistoryText = createElement("span", {
    className: "empty__historyText display-medium14",
    text: "사용자 활동 기록이 없습니다.",
  });

  if (histories.length > 0) {
    $historyMain.append(
      ...histories.map((history) => HistoryItem({ history }))
    );
    return $historyMain;
  }

  $emptyHistory.appendChild($emptyHistoryText);
  $historyMain.append($emptyHistory);
  return $historyMain;
};

export default createHistoryMain;
