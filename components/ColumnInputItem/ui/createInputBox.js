import { createElement, createTextarea } from "../../../dom.js";

const createInputBox = ({ handleInputTitle, handleInputContent }) => {
  const $textBox = createElement("div", {
    className: "column__item__textBox",
  });

  const $title = createTextarea({
    id: "title",
    className: "column__item__title display-bold14",
    placeholder: "제목을 입력하세요",
    handleInput: handleInputTitle,
  });
  const $content = createTextarea({
    id: "content",
    className: "column__item__content display-medium14",
    placeholder: "내용을 입력하세요",
    handleInput: handleInputContent,
  });

  $textBox.appendChild($title);
  $textBox.appendChild($content);

  return $textBox;
};

export default createInputBox;
