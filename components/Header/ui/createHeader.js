import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const toggleText = {
  "최신 순": "생성 순",
  "생성 순": "최신 순",
};

const createHeader = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createElement("div", { className: "left__header" });
  const $title = createElement("h1", {
    className: "display-bold24",
    text: "TASKIFY",
  });

  // [ 데이터를 바꾸고, 데이터대로 DOM 업데이트 ]
  // 1. 로컬스토리지에서 데이터를 가져온다.
  // 2. 가져온 데이터를 정렬 기준에 맞게 정렬한다. (생성 순, 최신 순)
  // 3. 데이터를 기준으로 column__section을 갈아끼운다.
  const handleClickSort = (e) => {
    // 텍스트 토글 (생성 순 / 최신 순)
    e.currentTarget.querySelector("span").textContent =
      toggleText[e.currentTarget.textContent];
  };

  const $sortButton = createButton({
    className: "sort__button",
    handleClick: handleClickSort,
  });

  const $arrow = createImg({ src: IMAGE.arrowBoth, alt: "정렬" });
  const $sortText = createElement("span", {
    className: "display-medium12",
    text: "생성 순",
  });

  const $historyButton = createElement("button");
  const $img = createImg({
    src: IMAGE.clock,
    alt: "사용자 활동 기록",
  });

  $sortButton.append($arrow, $sortText);
  $leftHeader.append($title, $sortButton);
  $historyButton.appendChild($img);
  $header.append($leftHeader, $historyButton);

  return $header;
};

export default createHeader;
