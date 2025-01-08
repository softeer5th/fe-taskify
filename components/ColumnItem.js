import { createElement, createButton, createImg } from "../dom.js";

const ColumnItem = ({ title = "", content = "", author = "web" }) => {
  const $columnItem = createElement("div", { className: "column__item" });

  const $textContainer = createElement("div", {
    className: "column__item__textContainer",
  });

  const $textBox = createElement("div", {
    className: "column__item__textBox",
  });
  const $itemTitle = createElement("h3", {
    className: "column__item__title display-bold14",
    text: title,
  });
  const $itemContent = createElement("p", {
    className: "column__item__content display-medium14",
    text: content,
  });
  $textBox.append($itemTitle, $itemContent);

  const $author = createElement("span", {
    className: "userAgent display-medium12",
    text: `author by ${author}`,
  });

  const $itemButtonContainer = createElement("div", {
    className: "column__item__buttonContainer",
  });
  const $deleteButton = createButton({
    handleClick: () => alert("Delete button clicked"),
  });
  const $deleteImg = createImg({
    src: "./assets/icon/closed.svg",
    alt: "삭제",
  });
  $deleteButton.appendChild($deleteImg);

  const $editButton = createButton({
    handleClick: () => alert("Edit button clicked"),
  });
  const $editImg = createImg({
    src: "./assets/icon/edit.svg",
    alt: "수정",
  });
  $editButton.appendChild($editImg);

  $itemButtonContainer.append($deleteButton, $editButton);

  $textContainer.append($textBox, $itemButtonContainer);
  $columnItem.append($textContainer, $author);

  return $columnItem;
};

export default ColumnItem;
