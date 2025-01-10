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
      $columnBody.replaceChild(draggedElement, shadowElement);
      shadowElement.remove();
      shadowElement = null;
    }

    const newSectionId = $columnBody.closest(".column__container").id;
    const itemId = Number(draggedElement.dataset.id);

    updateTodoList(newSectionId, itemId);
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

// 1. drop한 시점에 $columnBody에 있는 shadowElement를 draggedElement로 교체
// 2. 요소를 drop한 section id와 해당 요소의 id를 넘겨준다.
// 칼럼 이동: 이전 칼럼에서 제거하고, 새로운 칼럼에 추가
// - 첫 진입 시 어차피 생성 순으로 정렬되므로 최하단에 추가
// TODO: 배열 메서드로 개선 필요
const updateTodoList = (sectionId, itemId) => {
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
      return {
        ...section,
        items: [...section.items, draggedItem],
      };
    }
    return section;
  });

  updateCount(finalList);
  saveLocalStorage(finalList);
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
