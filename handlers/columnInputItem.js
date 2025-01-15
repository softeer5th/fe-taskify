import ColumnItem from "../components/ColumnItem/ColumnItem.js";
import { STORAGE_KEY } from "../constants/storageKey.js";
import historyStore from "../store/historyStore.js";
import todoStore from "../store/TodoStore.js";
import getDevice from "../utils/getDevice.js";
import { loadLocalStorage, saveLocalStorage } from "../utils/localStorage.js";

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
  const $columnItem = e.target.closest(".column__item");
  const $columnContainer = e.target.closest(".column__container");
  const sectionId = $columnContainer.id;
  const sectionTitle = $columnContainer.querySelector(
    ".column__header .column__title"
  ).textContent;

  const title = $columnItem.querySelector("#title").value.trim();
  const content = $columnItem.querySelector("#content").value.trim();

  type === "add"
    ? addColumnList({ sectionId, sectionTitle, title, content })
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

const addColumnList = ({ sectionId, sectionTitle, title, content }) => {
  const column = sectionTitle;
  const newTodo = {
    title,
    content,
    author: getDevice(),
  };

  todoStore.add({ sectionId, todo: newTodo });
  historyStore.action({
    action: "add",
    column,
    title,
  });
};
