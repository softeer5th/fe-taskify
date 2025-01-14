import { createElement } from "../../../../dom.js";
import HistoryItem from "./HistoryItem/HistoryItem.js";

const HistoryMain = ({ histories }) => {
  const $historyMain = createElement("ul", { className: "history__main" });

  const $emptyHistory = createElement("div", {
    className: "empty__history",
  });

  const $emptyHistoryText = createElement("span", {
    className: "empty__historyText display-medium14",
    text: "사용자 활동 기록이 없습니다.",
  });

  if (histories.length > 0) {
    $historyMain.replaceChildren(
      ...histories.map((history) => HistoryItem({ history }))
    );
    return $historyMain;
  }

  $emptyHistory.appendChild($emptyHistoryText);
  $historyMain.append($emptyHistory);
  return $historyMain;
};

export default HistoryMain;
