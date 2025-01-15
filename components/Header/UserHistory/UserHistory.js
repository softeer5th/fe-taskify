import { createElement } from "../../../dom.js";
import historyStore from "../../../store/historyStore.js";
import createHistoryFooter from "../ui/createHistoryFooter.js";
import HistoryHeader from "./HistoryHeader/HistoryHeader.js";
import HistoryMain from "./HistoryMain/HistoryMain.js";

const updateHistoryFooter = ({ histories }) => {
  const $userHistoryDOM = document.querySelector(".user-history");
  const $historyFooterDOM = $userHistoryDOM.querySelector(".history__footer");

  // 활동 기록 최초 생성
  if (histories.length > 0 && !$historyFooterDOM) {
    const $historyFooter = createHistoryFooter({
      histories,
    });

    $userHistoryDOM.appendChild($historyFooter);
    // 활동 기록 모두 제거
  } else if (histories.length === 0 && $historyFooterDOM) {
    $userHistoryDOM.lastChild.remove();
  }
};

const UserHistory = () => {
  const $userHistory = createElement("div", {
    className: "user-history shadow-floating",
  });
  const $historyHeader = HistoryHeader();
  const $historyMain = HistoryMain({ histories: historyStore.histories });
  const $historyFooter = createHistoryFooter({
    histories: historyStore.histories,
  });

  // 액션에 발생했을 때 history에 추가
  historyStore.subscribe((updatedHistories) => {
    const $updatedHistoryMain = HistoryMain({ histories: updatedHistories });
    const $historyMainDOM = document.querySelector(
      ".user-history .history__main"
    );
    $historyMainDOM.replaceWith($updatedHistoryMain);

    updateHistoryFooter({
      histories: updatedHistories,
    });
  });

  $userHistory.append($historyHeader, $historyMain, $historyFooter);
  return $userHistory;
};

export default UserHistory;
