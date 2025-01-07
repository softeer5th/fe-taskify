import { createNode, createButtonNode, createTextareaNode } from "./dom.js";

const $TODO_ADD_BUTTON = document.querySelector("#todo__section .add__button");

const handleDeleteTodo = () => {
  alert("delete");
};

const handleEditTodo = () => {
  alert("edit");
};

const handleCancel = () => {
  alert("cancel");
};

const handleSubmit = () => {
  alert("submit");
};

const handleInputTitle = (event) => {
  const value = event.target.value;
};

const handleInputContent = (event) => {
  const value = event.target.value;
};

const handleResizeTitle = (event) => {
  const $textarea = event.target;
  $textarea.style.height = $textarea.scrollHeight + "px";
};

const handleResizeContent = (event) => {
  const $textarea = event.target;
  $textarea.style.height = $textarea.scrollHeight + "px";
};

const createTextBox = () => {
  const $textBox = createNode("div", null, "column__item__textBox");

  const $title = createTextareaNode({
    id: "title",
    className: "column__item__title display-bold14",
    handleChange: handleResizeTitle,
    placeholder: "제목을 입력하세요",
    handleInput: handleInputTitle,
  });
  const $content = createTextareaNode({
    id: "content",
    className: "column__item__content display-medium14",
    handleChange: handleResizeContent,
    placeholder: "내용을 입력하세요",
    handleInput: handleInputContent,
  });

  $textBox.appendChild($title);
  $textBox.appendChild($content);

  return $textBox;
};

const createAddButtonContainer = () => {
  const $addButtonContainer = createNode(
    "div",
    null,
    "column__item__addButtonContainer"
  );
  const $closeButton = createButtonNode(
    null,
    "close__button",
    "취소",
    handleCancel
  );
  const $submitButton = createButtonNode(
    null,
    "submit__button",
    "등록",
    handleSubmit
  );

  $addButtonContainer.appendChild($closeButton);
  $addButtonContainer.appendChild($submitButton);

  return $addButtonContainer;
};

const createColumnItem = () => {
  const $columnItem = createNode("div", null, "column__item");
  const $textContainer = createNode("div", null, "column__item__textContainer");
  const $textBox = createTextBox();
  const $addButtonContainer = createAddButtonContainer();

  $textContainer.appendChild($textBox);
  $columnItem.appendChild($textContainer);
  $columnItem.appendChild($addButtonContainer);
  return $columnItem;
};

const addTodoItem = () => {
  const $todoColumn = document.querySelector("#todo__section .column__body");
  const $columnItem = createColumnItem();
  $todoColumn.appendChild($columnItem);
};

$TODO_ADD_BUTTON.addEventListener("click", addTodoItem);
