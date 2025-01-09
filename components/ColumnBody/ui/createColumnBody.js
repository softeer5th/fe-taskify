import { createElement } from "../../../dom.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../../utils/localStorage.js";
import ColumnItem from "../../ColumnItem/ColumnItem.js";

const createColumnBody = ({ sectionId, items }) => {
  let shadowElement = null;

  const $columnBody = createElement("div", {
    className: "column__body",
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    const target = e.target.closest(".column__item");

    if (!shadowElement) {
      shadowElement = document.createElement("div");
      shadowElement.classList.add("after-image", "shadow-normal");
    }

    if (target) {
      const rect = target.getBoundingClientRect();
      const offset = e.clientY - rect.top;

      if (offset < rect.height / 2) {
        $columnBody.insertBefore(shadowElement, target);
      } else {
        $columnBody.insertBefore(shadowElement, target.nextSibling);
      }
    } else {
      $columnBody.appendChild(shadowElement);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedElement = document.querySelector(".dragging");
    const siblingElements = Array.from($columnBody.children);
    const dropIndex = siblingElements.indexOf(shadowElement);

    if (shadowElement && draggedElement) {
      $columnBody.insertBefore(draggedElement, shadowElement);
      shadowElement.remove();
      shadowElement = null;
    }

    const newSectionId = $columnBody.closest(".column__container").id;
    const itemId = Number(draggedElement.dataset.id);

    updateTodoList(newSectionId, itemId, dropIndex);
  };

  const handleDragLeave = (e) => {
    // 칼럼 벗어남 & 잔상 존재
    if (!e.currentTarget.contains(e.relatedTarget) && shadowElement) {
      shadowElement.remove();
      shadowElement = null;
    }
  };

  $columnBody.addEventListener("dragover", handleDragOver);
  $columnBody.addEventListener("drop", handleDrop);
  $columnBody.addEventListener("dragleave", handleDragLeave);

  items.forEach(({ id, title, content, author }) => {
    const $columnItem = ColumnItem({ sectionId, id, title, content, author });
    $columnBody.appendChild($columnItem);
  });

  return $columnBody;
};

export default createColumnBody;

// drag drop 한 순서 DB에 반영
const updateTodoList = (sectionId, itemId, dropIndex) => {
  const todoList = loadLocalStorage();

  let draggedItem = null;

  const filteredList = todoList.map((section) => {
    if (section.items.some((item) => item.id === itemId)) {
      draggedItem = section.items.find((item) => item.id === itemId);
      return {
        ...section,
        items: section.items.filter((item) => item.id !== itemId),
      };
    }
    return section;
  });

  const finalList = filteredList.map((section) => {
    if (section.id === sectionId && draggedItem) {
      const updatedItems = [...section.items];
      updatedItems.splice(dropIndex, 0, draggedItem); // 드롭된 위치에 삽입
      return {
        ...section,
        items: updatedItems,
      };
    }
    return section;
  });

  updateCount(finalList);
  saveLocalStorage(finalList);
};

const updateCount = (todoList) => {
  const $columnSection = document.querySelector(".column__section");

  const $todoCount = $columnSection
    .querySelector("#todo__section")
    .querySelector(".column__count");

  const $progressCount = $columnSection
    .querySelector("#progress__section")
    .querySelector(".column__count");

  const $finishedCount = $columnSection
    .querySelector("#finished__section")
    .querySelector(".column__count");

  todoList.forEach((section) => {
    if (section.id === "todo__section") {
      $todoCount.textContent = section.items.length;
    } else if (section.id === "progress__section") {
      $progressCount.textContent = section.items.length;
    } else if (section.id === "finished__section") {
      $finishedCount.textContent = section.items.length;
    }
  });
};
