import {
  createNode,
  createButtonNode,
  createTextareaNode,
  createImgNode,
} from "./dom.js";

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

const handleSubmit = (e) => {
  const $button = e.target;
  const $columnItem = $button.closest(".column__item");
  const $textContainer = $columnItem.querySelector(
    ".column__item__textContainer"
  );
  const $titleInput = $columnItem.querySelector("#title");
  const $contentInput = $columnItem.querySelector("#content");
  const title = $titleInput.value;
  const content = $contentInput.value;

  const $title = createNode(
    "h3",
    null,
    "column__item__title display-bold14",
    title
  );
  const $content = createNode(
    "p",
    null,
    "column__item__content display-medium14",
    content
  );

  const $userAgent = createNode(
    "span",
    null,
    "userAgent display-medium12",
    "author by web"
  );

  const $buttonContainer = createEditButtonContainer();
  const $newTextBox = document.createElement("div");
  $newTextBox.classList.add("column__item__textBox");
  $newTextBox.appendChild($title);
  $newTextBox.appendChild($content);

  $textContainer.replaceChildren($newTextBox, $buttonContainer);
  $columnItem.replaceChild($userAgent, $columnItem.lastChild);
};

const handleInputTitle = (e) => {
  const $input = e.target;
  $input.style.height = $input.scrollHeight + "px"; // 글의 길이에 맞춰 입력창 높이 조절

  const $column__item = $input.closest(".column__item");
  const $submitButton = $column__item.querySelector(".submit__button");
  const content = $input.nextElementSibling.value;
  const title = e.target.value;

  if (title.length > 0 && content.length > 0) {
    $submitButton.disabled = false;
  } else {
    $submitButton.disabled = true;
  }
};

const handleInputContent = (e) => {
  const $input = e.target;
  $input.style.height = $input.scrollHeight + "px";

  const $column__item = $input.closest(".column__item");
  const $submitButton = $column__item.querySelector(".submit__button");
  const title = $input.previousElementSibling.value;
  const content = e.target.value;

  if (title.length > 0 && content.length > 0) {
    $submitButton.disabled = false;
  } else {
    $submitButton.disabled = true;
  }
};

const createTextBox = () => {
  const $textBox = createNode("div", null, "column__item__textBox");

  const $title = createTextareaNode({
    id: "title",
    className: "column__item__title display-bold14",
    placeholder: "제목을 입력하세요",
    handleInput: handleInputTitle,
  });
  const $content = createTextareaNode({
    id: "content",
    className: "column__item__content display-medium14",
    placeholder: "내용을 입력하세요",
    handleInput: handleInputContent,
  });

  $textBox.appendChild($title);
  $textBox.appendChild($content);

  return $textBox;
};

const createEditButtonContainer = () => {
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

  return $buttonContainer;
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
    handleSubmit,
    true
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
  $todoColumn.prepend($columnItem);
};

$TODO_ADD_BUTTON.addEventListener("click", addTodoItem);
