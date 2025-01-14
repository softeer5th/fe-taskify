import { createButton, createElement } from "../../../dom.js";

const createAddButtonContainer = ({ type = "add" }) => {
  const $addButtonContainer = createElement("div", {
    className: "column__item__addButtonContainer",
  });

  const $closeButton = createButton({
    className: "close__button",
    text: "취소",
    type,
  });

  const $submitButton = createButton({
    className: "submit__button",
    text: type === "add" ? "등록" : "저장",
    disabled: true,
    type,
  });

  $addButtonContainer.appendChild($closeButton);
  $addButtonContainer.appendChild($submitButton);

  return $addButtonContainer;
};

export default createAddButtonContainer;
