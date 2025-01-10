import { IMAGE } from "../../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../../dom.js";

const createButtonContainer = ({ handleClickAdd }) => {
  const $buttonContainer = createElement("div", {
    className: "column__header__buttonContainer",
  });
  const $addButton = createButton({
    className: "add__button",
    handleClick: handleClickAdd,
  });
  const $addImg = createImg({
    src: IMAGE.plus,
    alt: "추가",
  });

  const $closeButton = createButton({
    handleClick: () => alert("Close button"),
  });
  const $closeImg = createDeleteSvg({
    className: "delete__img",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
  });

  $addButton.appendChild($addImg);
  $closeButton.appendChild($closeImg);
  $buttonContainer.append($addButton, $closeButton);

  return $buttonContainer;
};

export default createButtonContainer;
