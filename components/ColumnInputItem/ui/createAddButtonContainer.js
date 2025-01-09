import { createButton, createElement } from "../../../dom.js";

const createAddButtonContainer = ({ handleCancel, handleSubmit }) => {
  const $addButtonContainer = createElement("div", {
    className: "column__item__addButtonContainer",
  });
  const $closeButton = createButton({
    className: "close__button",
    text: "취소",
    handleClick: handleCancel,
  });
  const $submitButton = createButton({
    className: "submit__button",
    text: "등록",
    handleClick: handleSubmit,
    disabled: true,
  });

  $addButtonContainer.appendChild($closeButton);
  $addButtonContainer.appendChild($submitButton);

  return $addButtonContainer;
};

export default createAddButtonContainer;
