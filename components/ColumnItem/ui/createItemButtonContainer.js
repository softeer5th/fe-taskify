import { IMAGE } from "../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../dom.js";

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

const createItemButtonContainer = ({ sectionId, itemId }) => {
  const handleClickDelete = () => {
    createModal({ content: "선택한 카드를 삭제할까요?", sectionId, itemId });
  };

  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({
    className: "delete__button",
    handleClick: handleClickDelete,
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
