import { createElement } from "../../dom.js";
import getDevice from "../../utils/getDevice.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../utils/localStorage.js";
import ColumnItem from "../ColumnItem/ColumnItem.js";
import createColumnInputItem from "./ui/createColumnInputItem.js";

loadStyleSheet("/components/ColumnInputItem/styles.css");

const ColumnInputItem = ({ sectionId, store, handleCancel }) => {
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

  const createNewColumnItem = ({ id, title, content, author, sectionId }) => {
    const $userAgent = createElement("span", {
      className: "userAgent display-medium12",
      text: `author by ${author}`,
    });

    const $newColumnItem = ColumnItem({
      id,
      title,
      content,
      author,
      sectionId,
    });

    $newColumnItem.replaceChild($userAgent, $newColumnItem.lastChild);

    return $newColumnItem;
  };

  const handleSubmit = (e) => {
    const $button = e.target;
    const $columnItem = $button.closest(".column__item");

    const title = $columnItem.querySelector("#title").value.trim();
    const content = $columnItem.querySelector("#content").value.trim();

    // 카드 생성
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    const newCard = {
      id: array[0],
      title,
      content,
      author: getDevice(),
      createdAt: new Date(),
    };

    const $newColumnItem = createNewColumnItem({
      ...newCard,
      sectionId,
    });

    const $columnBody = $columnItem.closest(".column__body");
    $columnBody.replaceChild($newColumnItem, $columnBody.firstChild);

    // 카드 저장
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
    store.isTodoAdding = false;
  };

  return createColumnInputItem({
    handleInputTitle,
    handleInputContent,
    handleCancel,
    handleSubmit,
  });
};

export default ColumnInputItem;
