import { createElement } from "../../../dom.js";

const createNewTextBox = ({ title, content }) => {
  const $title = createElement("h3", {
    className: "column__item__title display-bold14",
    text: title,
  });
  const $content = createElement("p", {
    className: "column__item__content display-medium14",
    text: content,
  });

  const $newTextBox = createElement("div", {
    className: "column__item__textBox",
  });

  $newTextBox.appendChild($title);
  $newTextBox.appendChild($content);

  return $newTextBox;
};

export default createNewTextBox;
