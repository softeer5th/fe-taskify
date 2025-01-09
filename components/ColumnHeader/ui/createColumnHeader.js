import {
  createElement,
  createButton,
  createImg,
  createDeleteSvg,
} from "../../../dom.js";
import { IMAGE } from "../../../assets/index.js";

const createColumnHeader = ({ title, count, handleClickAdd }) => {
  const $columnHeader = createElement("div", { className: "column__header" });

  const $titleContainer = createElement("div", {
    className: "column__header__titleContainer",
  });
  const $title = createElement("span", {
    className: "column__title display-bold16",
    text: title,
  });
  const $count = createElement("span", {
    className: "column__count display-medium12",
    text: count,
  });

  $titleContainer.append($title, $count);

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
  $addButton.appendChild($addImg);

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

  $closeButton.appendChild($closeImg);
  $buttonContainer.append($addButton, $closeButton);
  $columnHeader.append($titleContainer, $buttonContainer);

  return $columnHeader;
};

export default createColumnHeader;
