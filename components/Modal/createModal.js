import loadStyleSheet from "../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../utils/localStorage.js";

loadStyleSheet("/components/Modal/styles.css");

const createModal = ({ title = "", content = "", sectionId, itemId }) => {
  const $modalContainer = document.getElementById("modal-container");
  const $modal = document.createElement("div");
  const handleClose = () => {
    $modal.remove();
  };

  $modal.innerHTML = /*html*/ `
      <div class="modal__dimmed"></div>
      <div class="modal modal__wrapper shadow-up">
        ${title ? `<p class="modal__title display-bold16">${title}</p>` : ""}
        ${
          content
            ? `<p class="modal__content display-medium16">${content}</p>`
            : ""
        }
        <div class="modal__buttonContainer">
        <button class="cancel__button display-bold14">취소</button>
          <button class="delete__button display-bold14">삭제</button>
        </div>
      </div>
    `;

  $modal.querySelector(".modal__dimmed").addEventListener("click", handleClose);

  $modal.querySelector(".delete__button").addEventListener("click", () => {
    deleteCard({ sectionId, itemId });
    handleClose();
  });

  $modal
    .querySelector(".cancel__button")
    .addEventListener("click", handleClose);

  $modalContainer.appendChild($modal);
};

const deleteCard = ({ sectionId, itemId }) => {
  const $columnItem = document.querySelector(
    `#${sectionId} .column__item[data-id="${itemId}"]`
  );

  const todoList = loadLocalStorage();

  const filteredList = todoList.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        }
      : section
  );

  const itemLength = filteredList.find((section) => section.id === sectionId)
    .items.length;

  const $columnCount = $columnItem
    .closest(".column__container")
    .querySelector(".column__count");

  $columnCount.textContent = itemLength;

  saveLocalStorage(filteredList);

  $columnItem.remove();
};

export default createModal;
