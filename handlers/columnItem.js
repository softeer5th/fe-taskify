import ColumnInputItem from "../components/ColumnInputItem/ColumnInputItem.js";
import createModal from "../components/Modal/createModal.js";
import { STORAGE_KEY } from "../constants/storageKey.js";
import historyStore from "../store/historyStore.js";
import { loadLocalStorage, saveLocalStorage } from "../utils/localStorage.js";

export const handleClickDelete = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const itemId = Number($columnItem.dataset.id);

  const $modalContainer = document.getElementById("modal-container");
  $modalContainer.dataset.itemId = itemId;

  createModal({
    content: "선택한 카드를 삭제할까요?",
  });
};

export const handleClickEdit = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const $textBox = e.target.closest(".column__item__textContainer").firstChild;

  const title = $textBox.firstChild.textContent;
  const content = $textBox.lastChild.textContent;
  const itemId = Number($columnItem.dataset.id);

  const $columnInputItem = ColumnInputItem({
    id: itemId,
    title,
    content,
    type: "edit",
  });

  $columnItem.replaceWith($columnInputItem);
};

export const deleteColumnItem = ({ sectionId, itemId, $columnItem }) => {
  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

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
  saveLocalStorage(STORAGE_KEY.todoList, filteredList);

  $columnItem.remove();

  const deletedCard = todoList
    .find((section) => section.id === sectionId)
    .items.find((item) => item.id === itemId);

  historyStore.action({
    action: "remove",
    title: deletedCard.title,
  });
};
