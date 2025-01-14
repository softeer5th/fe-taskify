import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const createHistoryHeader = () => {
  const handleClickClose = (e) => {
    const $userHistory = e.currentTarget.closest(".user-history");
    $userHistory.classList.toggle("fade-in");
  };

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

  const $closeButton = createButton({
    className: "history__closeButton",
    handleClick: handleClickClose,
  });

  $closeButton.append($closeImg, $closeText);
  $historyHeader.append($historyTitle, $closeButton);
  return $historyHeader;
};

export default createHistoryHeader;
