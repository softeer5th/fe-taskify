import Button from "../component/button.js";

export default function ModalView({ modalText, closeText, activeText, onClickModalCloseButton, onClickModalActiveButton }) {
  const modalBackgroundElement = document.createElement("div");
  modalBackgroundElement.classList.add("modal__background");
  modalBackgroundElement.tabIndex = 0;

  const modalElement = document.createElement("div");
  modalElement.classList.add("modal");

  const modalTextElement = document.createElement("div");
  modalTextElement.classList.add("modal__text");
  modalTextElement.textContent = modalText;

  const modalButtonContainer = document.createElement("div");
  modalButtonContainer.classList.add("modal__button-container");

  const modalCloseButton = Button({
    className: ["button", "button-alt"],
    onClick: onClickModalCloseButton,
    children: [closeText],
  });

  const modalActiveButton = Button({
    className: ["button", "button-danger"],
    onClick: onClickModalActiveButton,
    children: [activeText],
  });

  modalButtonContainer.appendChild(modalCloseButton);
  modalButtonContainer.appendChild(modalActiveButton);

  modalElement.appendChild(modalTextElement);
  modalElement.appendChild(modalButtonContainer);

  modalBackgroundElement.appendChild(modalElement);

  return modalBackgroundElement;
}
