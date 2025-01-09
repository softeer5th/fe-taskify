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

    if (shadowElement && draggedElement) {
      $columnBody.insertBefore(draggedElement, shadowElement);
      shadowElement.remove();
      shadowElement = null;
    }

    const newSectionId = $columnBody.closest(".column__container").id;
    const itemId = draggedElement.dataset.id;

    updateTodoList(newSectionId, itemId);
  };

  const handleDragLeave = (e) => {
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

const updateTodoList = (newSectionId, itemId) => {
  const todoList = loadLocalStorage();

  let draggedItem = null;
  const updatedList = todoList.map((section) => {
    if (section.items.find((item) => item.id == itemId)) {
      draggedItem = section.items.find((item) => item.id == itemId);
      return {
        ...section,
        items: section.items.filter((item) => item.id != itemId),
      };
    }
    return section;
  });

  const finalList = updatedList.map((section) => {
    if (section.id === newSectionId && draggedItem) {
      return {
        ...section,
        items: [...section.items, draggedItem],
      };
    }
    return section;
  });

  saveLocalStorage(finalList);
};
