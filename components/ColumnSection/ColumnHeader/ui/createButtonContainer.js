import { IMAGE } from "../../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../../dom.js";

const createButtonContainer = () => {
  const $buttonContainer = createElement("div", {
    className: "column__header__buttonContainer",
  });
  const $addButton = createButton({
    className: "add__button",
  });
  const $addImg = createImg({
    src: IMAGE.plus,
    alt: "추가",
  });

  const $deleteButton = createButton({
    className: "column__deleteButton",
    type: "column",
  });
  const $deleteImg = createDeleteSvg({
    className: "delete__img",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
  });

  $addButton.appendChild($addImg);
  $deleteButton.appendChild($deleteImg);
  $buttonContainer.append($addButton, $deleteButton);

  return $buttonContainer;
};

export default createButtonContainer;
