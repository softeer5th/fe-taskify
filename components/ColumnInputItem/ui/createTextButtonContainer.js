import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const createTextButtonContainer = () => {
  const $buttonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({ handleClick: () => {} });
  const $deleteImg = createImg({
    src: IMAGE.closed,
    alt: "닫기",
  });
  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({ handleClick: () => {} });
  const $editImg = createImg({ src: IMAGE.edit, alt: "수정" });
  $editButton.appendChild($editImg);

  $buttonContainer.appendChild($deleteButton);
  $buttonContainer.appendChild($editButton);

  return $buttonContainer;
};

export default createTextButtonContainer;
