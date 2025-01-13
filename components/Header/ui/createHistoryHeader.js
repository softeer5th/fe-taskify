import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const createHistoryHeader = () => {
  const $historyHeader = createElement("div", {
    className: "history__header",
  });
  const $historyTitle = createElement("span", {
    className: "history__title display-bold16",
    text: "사용자 활동 기록",
  });

  const $closeImg = createImg({
    src: IMAGE.closed,
    alt: "닫기",
  });
  const $closeText = createElement("span", {
    className: "history__close display-bold14",
    text: "닫기",
  });

  // TODO: 닫기 버튼 클릭 시 오른쪽 이동 애니메이션 적용
  const $closeButton = createButton({
    className: "history__closeButton",
    handleClick: () => {
      alert("닫기");
    },
  });

  $closeButton.append($closeImg, $closeText);
  $historyHeader.append($historyTitle, $closeButton);
  return $historyHeader;
};

export default createHistoryHeader;
