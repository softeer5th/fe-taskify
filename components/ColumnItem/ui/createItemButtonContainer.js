import { IMAGE } from "../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../dom.js";

const createItemButtonContainer = () => {
  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({
    className: "delete__button",
    type: "card",
  });

  const $deleteImg = createDeleteSvg({
    className: "delete__img",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
  });

  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({
    className: "edit__button",
  });
  const $editImg = createImg({
    src: IMAGE.edit,
    alt: "수정",
  });

  $editButton.appendChild($editImg);

  $itemButtonContainer.append($deleteButton, $editButton);
  return $itemButtonContainer;
};

export default createItemButtonContainer;
