import { createElement } from "../../../dom.js";

const createTextBox = ({ title, content }) => {
  const $textBox = createElement("div", {
    className: "column__item__textBox",
  });
  const $itemTitle = createElement("h3", {
    className: "column__item__title display-bold14",
    text: title,
  });
  const $itemContent = createElement("p", {
    className: "column__item__content display-medium14",
    text: content,
  });

  $textBox.append($itemTitle, $itemContent);

  return $textBox;
};

export default createTextBox;
