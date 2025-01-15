import { STORAGE_KEY } from "../../../constants/storageKey.js";
import historyStore from "../../../store/historyStore.js";
import loadStyleSheet from "../../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../../utils/localStorage.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnSection/ColumnBody/styles.css");

const ColumnBody = ({ sectionId, items }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    const $draggedElement = document.querySelector(".dragging");

    // 드래그가 이동한 좌표에서 가장 가까운 columnItem
    const $target = e.target.closest(".column__item");

    if ($draggedElement && $target) {
      // offset: target의 DOM 요소를 가져와서, 마우스 y좌표와 요소의 상단부분의 차이
      // 차이가 target의 height의 절반보다 작으면 위로, 크면 아래로 이동
      const rect = $target.getBoundingClientRect();
      const offset = e.clientY - rect.top;

      if (offset < rect.height / 2) {
        $columnBody.insertBefore($draggedElement, $target);
      } else {
        $columnBody.insertBefore($draggedElement, $target.nextSibling);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const prevSectionId = e.dataTransfer.getData("text/prevSectionId");
    const $draggedElement = document.querySelector(".dragging");

    const sectionId = $columnBody.closest(".column__container").id;
    const itemId = Number($draggedElement.dataset.id);
    const title = $draggedElement.querySelector(
      ".column__item__title"
    ).textContent;

    updateTodoList({ sectionId, itemId, prevSectionId, title });
  };

  const $columnBody = createColumnBody({
    sectionId,
    items,
  });

  $columnBody.addEventListener("dragover", handleDragOver);
  $columnBody.addEventListener("drop", handleDrop);

  return $columnBody;
};

// TODO: 배열 메서드로 개선 필요
const updateTodoList = ({ sectionId, itemId, prevSectionId, title }) => {
  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

  let draggedItem = null;

  const prevColumn = todoList.find(
    (section) => section.id === prevSectionId
  ).title;
  const nextColumn = todoList.find((section) => section.id === sectionId).title;

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
  saveLocalStorage(STORAGE_KEY.todoList, finalList);

  if (prevColumn !== nextColumn) {
    historyStore.action({
      action: "move",
      title,
      prevColumn: prevColumn,
      nextColumn: nextColumn,
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

export default ColumnBody;
