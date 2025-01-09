import { createElement } from "../../../dom.js";
import createItemButtonContainer from "./createItemButtonContainer.js";
import createTextBox from "./createTextBox.js";

const createTextContainer = ({ sectionId, itemId, title, content }) => {
  const $textContainer = createElement("div", {
    className: "column__item__textContainer",
  });

  const $itemButtonContainer = createItemButtonContainer({
    sectionId,
    itemId,
    title,
    content,
  });

  const $textBox = createTextBox({ title, content });
  $textContainer.append($textBox, $itemButtonContainer);

  return $textContainer;
};

export default createTextContainer;
