import { IMAGE } from "../../../assets/index.js";
import { createElement } from "../../../dom.js";
import createHistoryFooter from "../ui/createHistoryFooter.js";
import HistoryHeader from "./HistoryHeader/HistoryHeader.js";
import HistoryMain from "./HistoryMain/HistoryMain.js";

const histories = [
  {
    id: 1,
    action: "move",
    date: "2025-01-13T05:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것",
    prevColumn: "하고있는 일",
    nextColumn: "해야할 일",
  },
  {
    id: 2,
    action: "add",
    date: "2025-01-13T04:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것(add)",
    column: "해야할 일",
  },
  {
    id: 3,
    action: "remove",
    date: "2025-01-12T04:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것(remove)",
  },
  {
    id: 4,
    action: "update",
    date: "2025-01-13T02:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것(update)",
  },
  {
    id: 5,
    action: "update",
    date: "2025-01-13T02:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것(update)",
  },
  {
    id: 6,
    action: "update",
    date: "2025-01-13T02:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것(update)",
  },
];

const sortedHistories = [...histories].sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

const UserHistory = () => {
  const handleDeleteHistory = () => {
    // TODO: 사용자 활동 기록 저장 데이터도 모두 삭제
    const $userHistory = document.querySelector(".history__main");
    $userHistory.replaceChildren();
  };

  const $userHistory = createElement("div", {
    className: "user-history shadow-floating",
  });
  const $historyHeader = HistoryHeader();
  const $historyMain = HistoryMain({ histories: sortedHistories });

  if (histories.length > 0) {
    const $historyFooter = createHistoryFooter({ handleDeleteHistory });
    $userHistory.append($historyHeader, $historyMain, $historyFooter);
    return $userHistory;
  }

  $userHistory.append($historyHeader, $historyMain);
  return $userHistory;
};

export default UserHistory;
