import { ACTION_TYPE } from "../constants/action.js";
import { STORAGE_KEY } from "../constants/storageKey.js";
import historyStore from "../store/historyStore.js";
import { loadLocalStorage, saveLocalStorage } from "../utils/localStorage.js";

export const handleDragStart = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const prevSectionId = $columnItem.closest(".column__container").id;
  e.dataTransfer.setData("text/prevSectionId", prevSectionId);
  $columnItem.classList.add("dragging");
};

export const handleDragEnd = (e) => {
  const $columnItem = e.target.closest(".column__item");
  $columnItem.classList.remove("dragging");
};

export const handleDragOver = (e) => {
  e.preventDefault();

  const $columnBody = e.target.closest(".column__body");
  const $draggedElement = document.querySelector(".dragging");
  const $target = e.target.closest(".column__item");

  if ($columnBody && $draggedElement && $target) {
    const rect = $target.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    if (offset < rect.height / 2) {
      $columnBody.insertBefore($draggedElement, $target);
    } else {
      $columnBody.insertBefore($draggedElement, $target.nextSibling);
    }
  }
};

export const handleDrop = (e) => {
  e.preventDefault();
  const prevSectionId = e.dataTransfer.getData("text/prevSectionId");

  const $draggedElement = document.querySelector(".dragging");
  const $columnBody = e.target.closest(".column__body");

  const sectionId = $columnBody.closest(".column__container").id;
  const itemId = Number($draggedElement.dataset.id);
  const title = $draggedElement.querySelector(
    ".column__item__title"
  ).textContent;

  updateTodoList({ sectionId, itemId, prevSectionId, title });
};

const updateTodoList = ({ sectionId, itemId, prevSectionId, title }) => {
  // 데이터 처리
  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

  const prevColumn = todoList.find((section) => section.id === prevSectionId);
  const nextColumn = todoList.find((section) => section.id === sectionId);

  const draggedItem = prevColumn.items.find((item) => item.id === itemId);

  const filteredList = todoList.map((section) =>
    section.id === prevSectionId
      ? {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        }
      : section
  );

  const finalList = filteredList.map((section) => {
    if (section.id === sectionId && draggedItem) {
      return {
        ...section,
        items: [...section.items, draggedItem],
      };
    }
    return section;
  });

  // UI 업데이트
  updateCount(finalList);

  // 데이터 처리
  saveLocalStorage(STORAGE_KEY.todoList, finalList);

  if (prevColumn !== nextColumn) {
    historyStore.action({
      action: ACTION_TYPE.move,
      title,
      prevColumn: prevColumn.title,
      nextColumn: nextColumn.title,
    });
  }
};

const updateCount = (todoList) => {
  const $columnSection = document.querySelector(".column__section");

  todoList.forEach(({ id, items }) => {
    const $count = $columnSection
      .querySelector(`#${id}`)
      .querySelector(".column__count");

    $count.textContent = items.length;
  });
};
