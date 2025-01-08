import {
  createElement,
  createButton,
  createTextarea,
  createImg,
} from "../dom.js";
import getDevice from "../utils/getDevice.js";

const createTextButtonContainer = () => {
  const $buttonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });

  const $deleteButton = createButton({ handleClick: () => {} });
  const $deleteImg = createImg({
    src: "./assets/icon/closed.svg",
    alt: "닫기",
  });
  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({ handleClick: () => {} });
  const $editImg = createImg({ src: "./assets/icon/edit.svg", alt: "수정" });
  $editButton.appendChild($editImg);

  $buttonContainer.appendChild($deleteButton);
  $buttonContainer.appendChild($editButton);

  return $buttonContainer;
};

const ColumnItemInput = ({ store, handleCancel }) => {
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
    const $textBox = createElement("div", {
      className: "column__item__textBox",
    });

    const $title = createTextarea({
      id: "title",
      className: "column__item__title display-bold14",
      placeholder: "제목을 입력하세요",
      handleInput: handleInputTitle,
    });
    const $content = createTextarea({
      id: "content",
      className: "column__item__content display-medium14",
      placeholder: "내용을 입력하세요",
      handleInput: handleInputContent,
    });

    $textBox.appendChild($title);
    $textBox.appendChild($content);

    return $textBox;
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

    const $title = createElement("h3", {
      className: "column__item__title display-bold14",
      text: title,
    });
    const $content = createElement("p", {
      className: "column__item__content display-medium14",
      text: content,
    });

    const $userAgent = createElement("span", {
      className: "userAgent display-medium12",
      text: `author by ${getDevice()}`,
    });

    const $buttonContainer = createTextButtonContainer();
    const $newTextBox = document.createElement("div");
    $newTextBox.classList.add("column__item__textBox");
    $newTextBox.appendChild($title);
    $newTextBox.appendChild($content);

    $textContainer.replaceChildren($newTextBox, $buttonContainer);
    $columnItem.replaceChild($userAgent, $columnItem.lastChild);

    store.isTodoAdding = false;
  };

  const createAddButtonContainer = () => {
    const $addButtonContainer = createElement("div", {
      className: "column__item__addButtonContainer",
    });
    const $closeButton = createButton({
      className: "close__button",
      text: "취소",
      handleClick: handleCancel,
    });
    const $submitButton = createButton({
      className: "submit__button",
      text: "등록",
      handleClick: handleSubmit,
      disabled: true,
    });

    $addButtonContainer.appendChild($closeButton);
    $addButtonContainer.appendChild($submitButton);

    return $addButtonContainer;
  };

  const $columnItem = createElement("div", { className: "column__item" });
  const $textContainer = createElement("div", {
    className: "column__item__textContainer",
  });
  const $textBox = createTextBox();
  const $addButtonContainer = createAddButtonContainer();

  $textContainer.appendChild($textBox);
  $columnItem.appendChild($textContainer);
  $columnItem.appendChild($addButtonContainer);

  return $columnItem;
};

export default ColumnItemInput;
