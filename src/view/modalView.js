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

  const modalCloseButton = document.createElement("button");
  modalCloseButton.classList.add("modal__button");
  modalCloseButton.classList.add("modal__button--close");
  modalCloseButton.textContent = closeText;
  modalCloseButton.addEventListener("click", onClickModalCloseButton);

  const modalActiveButton = document.createElement("button");
  modalActiveButton.classList.add("modal__button");
  modalActiveButton.classList.add("modal__button--active");
  modalActiveButton.textContent = activeText;
  modalActiveButton.addEventListener("click", onClickModalActiveButton);

  modalButtonContainer.appendChild(modalCloseButton);
  modalButtonContainer.appendChild(modalActiveButton);

  modalElement.appendChild(modalTextElement);
  modalElement.appendChild(modalButtonContainer);

  modalBackgroundElement.appendChild(modalElement);

  return modalBackgroundElement;
}
