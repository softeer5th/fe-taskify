import { IMAGE } from "../../../assets/index.js";
import {
  createButton,
  createDeleteSvg,
  createElement,
  createImg,
} from "../../../dom.js";
import historyStore from "../../../store/historyStore.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../../utils/localStorage.js";
import createEditModal from "../../Modal/createEditModal.js";
import createModal from "../../Modal/createModal.js";

const createItemButtonContainer = ({ sectionId, itemId }) => {
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

    const deletedCard = todoList
      .find((section) => section.id === sectionId)
      .items.find((item) => item.id === itemId);

    historyStore.action({
      action: "remove",
      title: deletedCard.title,
    });
  };

  const handleClickDelete = () => {
    createModal({
      content: "선택한 카드를 삭제할까요?",
      onClick: () => deleteCard({ sectionId, itemId }),
    });
  };

  const handleClickEdit = () => {
    const title = $itemButtonContainer.parentElement.querySelector(
      ".column__item__title"
    ).textContent;

    const content = $itemButtonContainer.parentElement.querySelector(
      ".column__item__content"
    ).textContent;

    createEditModal({ title, content, sectionId, itemId });
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
    handleClick: handleClickEdit,
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
