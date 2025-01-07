import { createNode, createButtonNode, createImgNode } from "./dom.js";

const $TODO_ADD_BUTTON = document.querySelector("#todo__section .add__button");

const handleDeleteTodo = () => {
  alert("delete");
};

const handleEditTodo = () => {
  alert("edit");
};

const createColumnItem = () => {
  const $columnItem = createNode("div", null, "column__item");

  const $textContainer = createNode("div", null, "column__item__textContainer");

  const $textBox = createNode("div", null, "column__item__textBox");
  const $title = createNode(
    "div",
    null,
    "column__item__title display-bold14",
    "Github 공부하기"
  );
  const $content = createNode(
    "div",
    null,
    "column__item__content display-medium14",
    "add, commit, push"
  );
  $textBox.appendChild($title);
  $textBox.appendChild($content);

  const $userAgent = createNode(
    "span",
    null,
    "userAgent display-medium12",
    "author by web"
  );

  $textContainer.appendChild($textBox);
  $textContainer.appendChild($userAgent);

  const $buttonContainer = createNode(
    "div",
    null,
    "column__item__buttonContainer"
  );

  const $deleteButton = createButtonNode(null, null, null, handleDeleteTodo);
  const $deleteImg = createImgNode("./assets/icon/closed.svg", "닫기");
  $deleteButton.appendChild($deleteImg);

  const $editButton = createButtonNode(null, null, null, handleEditTodo);
  const $editImg = createImgNode("./assets/icon/edit.svg", "수정");
  $editButton.appendChild($editImg);

  $buttonContainer.appendChild($deleteButton);
  $buttonContainer.appendChild($editButton);

  $columnItem.appendChild($textContainer);
  $columnItem.appendChild($buttonContainer);
  return $columnItem;
};

const addTodoItem = () => {
  const $todoColumn = document.querySelector("#todo__section .column__body");
  const $columnItem = createColumnItem();
  $todoColumn.appendChild($columnItem);
};

$TODO_ADD_BUTTON.addEventListener("click", addTodoItem);
