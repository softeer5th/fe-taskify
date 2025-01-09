import loadStyleSheet from "../../utils/loadStyleSheet.js";

loadStyleSheet("/components/Modal/styles.css");

const createModal = ({ title = "", content = "", sectionId, itemId }) => {
  const $modalContainer = document.getElementById("modal-container");
  const $modal = document.createElement("div");

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

  $modal.querySelector(".modal__dimmed").addEventListener("click", () => {
    $modal.remove();
  });

  $modal.querySelector(".delete__button").addEventListener("click", () => {
    deleteCard({ sectionId, itemId });
    $modal.remove();
  });

  $modal.querySelector(".cancel__button").addEventListener("click", () => {
    $modal.remove();
  });

  $modalContainer.appendChild($modal);
};

const deleteCard = ({ sectionId, itemId }) => {
  const $item = document.querySelector(
    `#${sectionId} .column__item[data-id="${itemId}"]`
  );

  $item.remove();
};

export default createModal;
