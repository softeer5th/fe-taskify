import { IMAGE } from "../assets/index.js";
import { createElement, createButton, createImg } from "../dom.js";
import ColumnItemInput from "./ColumnItemInput.js";

const ColumnHeader = ({ id, title, items, store }) => {
  const handleCancel = (e) => {
    const target = e.target;
    const $columnItem = target
      .closest(".column__container")
      .querySelector(".column__body");

    $columnItem.firstChild.remove();
    store.isTodoAdding = false;
  };

  const handleClickAdd = (e) => {
    if (store.isTodoAdding) {
      handleCancel(e);
    } else {
      addColumnItemInput({ store });
    }
  };

  const addColumnItemInput = ({ store }) => {
    const $columnBody = document.querySelector(`#${id} .column__body`);
    const $columnItemInput = ColumnItemInput({ store, handleCancel });
    $columnBody.prepend($columnItemInput);
    store.isTodoAdding = true;
  };

  const $columnHeader = createElement("div", { className: "column__header" });

  const $titleContainer = createElement("div", {
    className: "column__header__titleContainer",
  });
  const $title = createElement("span", {
    className: "column__title display-bold16",
    text: title,
  });
  const $count = createElement("span", {
    className: "column__count display-medium12",
    text: items.length,
  });
  $titleContainer.append($title, $count);

  const $buttonContainer = createElement("div", {
    className: "column__header__buttonContainer",
  });
  const $addButton = createButton({
    className: "add__button",
    handleClick: handleClickAdd,
  });
  const $addImg = createImg({
    src: IMAGE.plus,
    alt: "추가",
  });
  $addButton.appendChild($addImg);

  const $closeButton = createButton({
    handleClick: () => alert("Close button"),
  });
  const $closeImg = createImg({
    src: IMAGE.closed,
    alt: "닫기",
  });

  $closeButton.appendChild($closeImg);
  $buttonContainer.append($addButton, $closeButton);
  $columnHeader.append($titleContainer, $buttonContainer);

  return $columnHeader;
};

export default ColumnHeader;
