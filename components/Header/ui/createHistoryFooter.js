import { createButton, createElement } from "../../../dom.js";

const createHistoryFooter = () => {
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
  return $historyFooter;
};

export default createHistoryFooter;
