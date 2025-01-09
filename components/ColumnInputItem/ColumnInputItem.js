import { createElement } from "../../dom.js";
import getDevice from "../../utils/getDevice.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import {
  loadLocalStorage,
  saveLocalStorage,
} from "../../utils/localStorage.js";
import createColumnInputItem from "./ui/createColumnItemInput.js";
import createNewTextBox from "./ui/createNewTextBox.js";
import createTextButtonContainer from "./ui/createTextButtonContainer.js";

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

  const handleSubmit = (e) => {
    const $button = e.target;
    const $columnItem = $button.closest(".column__item");
    const $textContainer = $columnItem.querySelector(
      ".column__item__textContainer"
    );
    const $titleInput = $columnItem.querySelector("#title");
    const $contentInput = $columnItem.querySelector("#content");

    const title = $titleInput.value.trim();
    const content = $contentInput.value.trim();

    const $userAgent = createElement("span", {
      className: "userAgent display-medium12",
      text: `author by ${getDevice()}`,
    });

    const $buttonContainer = createTextButtonContainer();
    const $newTextBox = createNewTextBox({ title, content });

    $textContainer.replaceChildren($newTextBox, $buttonContainer);
    $columnItem.replaceChild($userAgent, $columnItem.lastChild);

    store.isTodoAdding = false;

    const lastId =
      $columnItem.closest(".column__body").lastChild.dataset.id ?? 0;
    const newCard = {
      id: Number(lastId) + 1,
      title,
      content,
      author: getDevice(),
    };

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

    const $columnCount = $columnItem
      .closest(".column__container")
      .querySelector(".column__count");

    $columnCount.textContent = itemLength;

    saveLocalStorage(newTodoList);
  };

  return createColumnInputItem({
    handleInputTitle,
    handleInputContent,
    handleCancel,
    handleSubmit,
  });
};

export default ColumnInputItem;
