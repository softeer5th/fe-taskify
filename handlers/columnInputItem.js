import createNewColumnItem from "../components/ColumnInputItem/ui/createNewColumnItem.js";
import ColumnItem from "../components/ColumnItem/ColumnItem.js";
import { STORAGE_KEY } from "../constants/storageKey.js";
import historyStore from "../store/historyStore.js";
import getDevice from "../utils/getDevice.js";
import { loadLocalStorage, saveLocalStorage } from "../utils/localStorage.js";
import { getRandomId } from "../utils/random.js";

export const handleInputTitle = (e) => {
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

export const handleInputContent = (e) => {
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

export const handleCancelEdit = (e, store) => {
  const $columnItem = e.target.closest(".column__item");
  const sectionId = e.target.closest(".column__container").id;
  const itemId = Number($columnItem.dataset.id);

  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

  const savedItem = todoList
    .find((section) => section.id === sectionId)
    .items.find((item) => item.id === itemId);

  $columnItem.replaceWith(
    ColumnItem({
      id: savedItem.id,
      title: savedItem.title,
      content: savedItem.content,
      author: savedItem.author,
    })
  );

  store.isTodoAdding = false;
};

// add일 때 등록 기능 | edit 일 때 편집 기능
export const handleSubmit = (e, store, type) => {
  const sectionId = e.target.closest(".column__container").id;
  const $columnItem = e.target.closest(".column__item");
  const $columnBody = $columnItem.closest(".column__body");

  const title = $columnItem.querySelector("#title").value.trim();
  const content = $columnItem.querySelector("#content").value.trim();

  type === "add"
    ? addColumnList({ $columnBody, sectionId, title, content })
    : editColumnList({ $columnItem, sectionId, title, content });

  store.isTodoAdding = false;
};

const editColumnList = ({ $columnItem, sectionId, title, content }) => {
  const itemId = Number($columnItem.dataset.id);

  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

  const savedItem = todoList
    .find((section) => section.id === sectionId)
    .items.find((item) => item.id === itemId);

  $columnItem.replaceWith(
    ColumnItem({
      id: savedItem.id,
      title: title,
      content: content,
      author: savedItem.author,
    })
  );

  saveEditTodoList({ todoList, sectionId, itemId, title, content });
};

const saveEditTodoList = ({ todoList, sectionId, itemId, title, content }) => {
  const editedColumnList = todoList.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          items: section.items.map((item) =>
            item.id === itemId ? { ...item, title, content } : item
          ),
        }
      : section
  );

  saveLocalStorage(STORAGE_KEY.todoList, editedColumnList);

  historyStore.action({
    action: "edit",
    title,
  });
};

const addColumnList = ({ $columnBody, sectionId, title, content }) => {
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
  });

  $columnBody.replaceChild($newColumnItem, $columnBody.firstChild);
  saveAddTodoList({ $columnBody, sectionId, newCard, title });
};

const saveAddTodoList = ({ $columnBody, sectionId, newCard, title }) => {
  const todoList = loadLocalStorage(STORAGE_KEY.todoList);

  const column = todoList.find((section) => section.id === sectionId).title;

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
  saveLocalStorage(STORAGE_KEY.todoList, newTodoList);

  historyStore.action({
    action: "add",
    column,
    title,
  });
};
