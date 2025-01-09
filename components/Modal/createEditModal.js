import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../utils/localStorage.js";

const createEditModal = ({ title = "", content = "", sectionId, itemId }) => {
  const $modalContainer = document.getElementById("modal-container");
  const $modal = document.createElement("div");
  const handleClose = () => {
    $modal.remove();
  };

  $modal.innerHTML = /*html*/ `
        <div class="modal__dimmed"></div>
        <div class="modal modal__wrapper shadow-up">
        <textarea id="title" rows="1" class="modal__title display-bold16">${title}</textarea>
        <textarea id="content" rows="1" class="modal__content display-medium16">${content}</textarea>
          <div class="modal__buttonContainer">
          <button class="cancel__button display-bold14">취소</button>
            <button class="edit__button display-bold14">저장</button>
          </div>
        </div>
      `;

  $modal.querySelector(".modal__dimmed").addEventListener("click", handleClose);

  $modal.querySelector(".edit__button").addEventListener("click", (e) => {
    editCard({ sectionId, itemId });
    handleClose();
  });

  $modal
    .querySelector(".cancel__button")
    .addEventListener("click", handleClose);

  $modalContainer.appendChild($modal);
};

const editCard = ({ sectionId, itemId }) => {
  const $columnItem = document.querySelector(
    `#${sectionId} .column__item[data-id="${itemId}"]`
  );

  const newTitle = document
    .querySelector("#modal-container")
    .querySelector("#title")
    .value.trim();

  const newContent = document
    .querySelector("#modal-container")
    .querySelector("#content")
    .value.trim();

  $columnItem.querySelector(".column__item__title").textContent = newTitle;
  $columnItem.querySelector(".column__item__content").textContent = newContent;

  const todoList = loadLocalStorage();

  const editedList = todoList.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          items: section.items.map((item) =>
            item.id === itemId
              ? { ...item, title: newTitle, content: newContent }
              : item
          ),
        }
      : section
  );

  saveLocalStorage(editedList);
};

export default createEditModal;
