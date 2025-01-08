import { createElement, createImg } from "../dom.js";

const Header = () => {
  const $header = createElement("header", { className: "header" });
  const $title = createElement("span", {
    className: "display-bold24",
    text: "TASKIFY",
  });
  const $historyButton = createElement("button");
  const $img = createImg({
    src: "./assets/icon/clock.svg",
    alt: "사용자 활동 기록",
  });

  $historyButton.appendChild($img);
  $header.appendChild($title);
  $header.appendChild($historyButton);

  return $header;
};

export default Header;
