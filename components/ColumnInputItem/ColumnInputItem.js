import historyStore from "../../store/historyStore.js";
import getDevice from "../../utils/getDevice.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../utils/localStorage.js";
import { getRandomId } from "../../utils/random.js";
import createColumnInputItem from "./ui/createColumnInputItem.js";
import createNewColumnItem from "./ui/createNewColumnItem.js";

loadStyleSheet("/components/ColumnInputItem/styles.css");

const ColumnInputItem = ({ sectionId, store, handleCancel }) => {
  const handleInputTitle = (e) => {
    const $input = e.target;
    $input.style.height = $input.scrollHeight + "px"; // 글의 길이에 맞춰 입력창 높이 조절

    const $submitButton = $input
      .closest(".column__item")
      .querySelector(".submit__button");

    const title = e.target.value;
    const content = $input.nextElementSibling.value;

    if (title.length > 0 && content.length > 0) {
      $submitButton.disabled = false;
    } else {
      $submitButton.disabled = true;
    }
  };

  const handleInputContent = (e) => {
    const $input = e.target;
    $input.style.height = $input.scrollHeight + "px";

    const $submitButton = $input
      .closest(".column__item")
      .querySelector(".submit__button");

    const title = $input.previousElementSibling.value;
    const content = e.target.value;

    if (title.length > 0 && content.length > 0) {
      $submitButton.disabled = false;
    } else {
      $submitButton.disabled = true;
    }
  };

  const handleSubmit = (e) => {
    const $columnItem = e.target.closest(".column__item");
    const $columnBody = $columnItem.closest(".column__body");

    const title = $columnItem.querySelector("#title").value.trim();
    const content = $columnItem.querySelector("#content").value.trim();

    updateColumnList({ $columnBody, sectionId, title, content });
    store.isTodoAdding = false;

    historyStore.addHistory({
      title,
      column: sectionId,
    });
  };

  return createColumnInputItem({
    handleInputTitle,
    handleInputContent,
    handleCancel,
    handleSubmit,
  });
};

const updateColumnList = ({ $columnBody, sectionId, title, content }) => {
  const uniqueId = getRandomId();

  const newCard = {
    id: uniqueId,
    title,
    content,
    author: getDevice(),
    createdAt: new Date(),
  };

  const $newColumnItem = createNewColumnItem({
    ...newCard,
    sectionId,
  });

  $columnBody.replaceChild($newColumnItem, $columnBody.firstChild);
  saveTodoList({ $columnBody, sectionId, newCard });
};

const saveTodoList = ({ $columnBody, sectionId, newCard }) => {
  const todoList = loadLocalStorage();

  const newTodoList = todoList.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          items: [...section.items, newCard],
        }
      : section
  );

  const itemLength = newTodoList.find((section) => section.id === sectionId)
    .items.length;

  const $columnCount = $columnBody
    .closest(".column__container")
    .querySelector(".column__count");

  $columnCount.textContent = itemLength;
  saveLocalStorage(newTodoList);
};

export default ColumnInputItem;
