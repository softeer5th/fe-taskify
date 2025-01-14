import historyStore from "../../../store/historyStore.js";
import loadStyleSheet from "../../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../../utils/localStorage.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnSection/ColumnBody/styles.css");

const ColumnBody = ({ sectionId, items }) => {
  let shadowElement = null;

  const handleDragOver = (e) => {
    e.preventDefault();
    const $target = e.target.closest(".column__item");

    if (!shadowElement) {
      shadowElement = document.createElement("div");
      shadowElement.classList.add("after-image", "shadow-normal");
    }

    if ($target) {
      const rect = $target.getBoundingClientRect();
      const offset = e.clientY - rect.top;

      if (offset < rect.height / 2) {
        $columnBody.insertBefore(shadowElement, $target);
      } else {
        $columnBody.insertBefore(shadowElement, $target.nextSibling);
      }
    } else {
      $columnBody.appendChild(shadowElement);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const prevSectionId = e.dataTransfer.getData("text/prevSectionId");
    const draggedElement = document.querySelector(".dragging");

    if (shadowElement && draggedElement) {
      $columnBody.replaceChild(draggedElement, shadowElement);
      shadowElement.remove();
      shadowElement = null;
    }

    const sectionId = $columnBody.closest(".column__container").id;
    const itemId = Number(draggedElement.dataset.id);
    const title = draggedElement.querySelector(
      ".column__item__title"
    ).textContent;

    updateTodoList({ sectionId, itemId, prevSectionId, title });
  };

  const handleDragLeave = (e) => {
    // 칼럼 벗어남 & 잔상 존재
    if (!e.currentTarget.contains(e.relatedTarget) && shadowElement) {
      shadowElement.remove();
      shadowElement = null;
    }
  };

  const $columnBody = createColumnBody({
    sectionId,
    items,
  });

  $columnBody.addEventListener("dragover", handleDragOver);
  $columnBody.addEventListener("drop", handleDrop);
  $columnBody.addEventListener("dragleave", handleDragLeave);

  return $columnBody;
};

// TODO: 배열 메서드로 개선 필요
const updateTodoList = ({ sectionId, itemId, prevSectionId, title }) => {
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

  historyStore.action({
    action: "move",
    title,
    prevColumn: prevSectionId,
    nextColumn: sectionId,
  });
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

export default ColumnBody;
