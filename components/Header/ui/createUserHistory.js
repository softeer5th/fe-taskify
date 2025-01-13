import { IMAGE } from "../../../assets/index.js";
import { createElement, createButton, createImg } from "../../../dom.js";
import createModal from "../../Modal/createModal.js";
import createHistoryHeader from "./createHistoryHeader.js";
import createHistoryContent from "./createHistoryItem.js";
import createHistoryMain from "./createHistoryMain.js";

const history = {
  id: 1,
  action: "move",
  date: "2025-01-10T05:20:01.833Z",
  profileImg: IMAGE.profile,
  nickname: "@멋진삼",
  title: "블로그에 포스팅할 것",
  prevColumn: "하고있는 일",
  nextColumn: "해야할 일",
};

const createUserHistory = () => {
  const $userHistory = createElement("div", {
    className: "user-history shadow-floating",
  });

  const $historyHeader = createHistoryHeader();
  const $historyMain = createHistoryMain({ history });

  const $historyFooter = createElement("div", {
    className: "history__footer",
  });

  // TODO: 기록 전체 삭제 삭제 클릭 시 모달 띄우기
  // TODO: 삭제하기 클릭 시 컨텐츠 전체 삭제
  const $deleteButton = createButton({
    className: "display-bold14",
    text: "기록 전체 삭제",
    handleClick: () => {
      // TODO: 사용자 활동 기록 저장 데이터도 모두 삭제
      $historyMain.replaceChildren();
    },
  });

  $historyFooter.appendChild($deleteButton);

  $userHistory.append($historyHeader, $historyMain, $historyFooter);
  return $userHistory;
};

export default createUserHistory;
