import { IMAGE } from "../../../assets/index.js";
import { createButton, createElement, createImg } from "../../../dom.js";

const createItemButtonContainer = () => {
  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });
  const $deleteButton = createButton({
    handleClick: () => alert("Delete button clicked"),
  });
  const $deleteImg = createImg({
    src: IMAGE.closed,
    alt: "삭제",
  });

  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({
    handleClick: () => alert("Edit button clicked"),
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
