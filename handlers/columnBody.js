import { ACTION_TYPE } from "../constants/action.js";
import historyStore from "../store/historyStore.js";
import todoStore from "../store/TodoStore.js";

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

  updateTodoList({ prevSectionId, sectionId, itemId, title });
};

const updateTodoList = ({ prevSectionId, sectionId, itemId, title }) => {
  const prevColumnTitle = document.querySelector(
    `#${prevSectionId} .column__title`
  );
  const nextColumnTitle = document.querySelector(
    `#${sectionId} .column__title`
  );

  todoStore.move({
    prevSectionId,
    sectionId,
    itemId,
  });

  if (prevColumnTitle !== nextColumnTitle) {
    historyStore.action({
      action: ACTION_TYPE.move,
      title,
      prevColumn: prevColumnTitle,
      nextColumn: nextColumnTitle,
    });
  }
};
