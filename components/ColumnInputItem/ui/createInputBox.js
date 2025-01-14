import { createElement, createTextarea } from "../../../dom.js";

const createInputBox = ({ title = "", content = "" }) => {
  const $textBox = createElement("div", {
    className: "column__item__textBox",
  });

  const $title = createTextarea({
    id: "title",
    className: "column__item__title display-bold14",
    placeholder: "제목을 입력하세요",
    value: title,
  });
  const $content = createTextarea({
    id: "content",
    className: "column__item__content display-medium14",
    placeholder: "내용을 입력하세요",
    value: content,
  });

  $textBox.appendChild($title);
  $textBox.appendChild($content);

  return $textBox;
};

export default createInputBox;
