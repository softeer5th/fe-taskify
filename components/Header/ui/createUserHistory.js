import { IMAGE } from "../../../assets/index.js";
import { createElement } from "../../../dom.js";
import createHistoryFooter from "./createHistoryFooter.js";
import createHistoryHeader from "./createHistoryHeader.js";
import createHistoryMain from "./createHistoryMain.js";

const histories = [
  {
    id: 1,
    action: "move",
    date: "2025-01-10T05:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것",
    prevColumn: "하고있는 일",
    nextColumn: "해야할 일",
  },
  {
    id: 2,
    action: "add",
    date: "2025-01-10T04:20:01.833Z",
    profileImg: IMAGE.profile,
    nickname: "@멋진삼",
    title: "블로그에 포스팅할 것",
    prevColumn: "하고있는 일",
    nextColumn: "해야할 일",
  },
];

const createUserHistory = () => {
  const $userHistory = createElement("div", {
    className: "user-history shadow-floating",
  });

  const $historyHeader = createHistoryHeader();
  const $historyMain = createHistoryMain({ histories });
  const $historyFooter = createHistoryFooter();

  $userHistory.append($historyHeader, $historyMain, $historyFooter);
  return $userHistory;
};

export default createUserHistory;
