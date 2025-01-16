import ColumnInputItem from "../components/ColumnInputItem/ColumnInputItem.js";
import createModal from "../components/Modal/createModal.js";
import { createInput } from "../dom.js";
import todoStore from "../store/TodoStore.js";

export const handleClickAdd = (e, store) => {
  if (store.isTodoAdding) {
    handleCancelAdd(e, store);
  } else {
    addColumnItemInput({ e, store });
  }
};

export const handleCancelAdd = (e, store) => {
  const target = e.target;
  const $columnItem = target
    .closest(".column__container")
    .querySelector(".column__body");

  $columnItem.firstChild.remove();
  store.isTodoAdding = false;
};

const addColumnItemInput = ({ e, store }) => {
  const target = e.target;
  const $section = target.closest(".column__container");

  const $columnBody = $section.querySelector(".column__body");

  const $columnItemInput = ColumnInputItem({ store });
  $columnBody.prepend($columnItemInput);
  store.isTodoAdding = true;
};

export const handleDeleteColumn = (e) => {
  const sectionId = e.target.closest(".column__container").id;
  const $modalContainer = document.getElementById("modal-container");
  $modalContainer.dataset.sectionId = sectionId;

  createModal({ content: "해당 칼럼을 삭제하시겠습니까?", type: "column" });
};

export const handleDbClickColumnHeader = (e) => {
  const $title = e.target.closest(".column__header__titleContainer").firstChild;

  const headerInput = createInput({
    className: "header__input display-bold16",
    value: $title.textContent,
  });
  $title.replaceWith(headerInput);
};

// input 외의 영역 클릭
export const handleClickInputOutside = () => {
  const $headerInput = document.querySelector(".header__input");

  if (!$headerInput) {
    return;
  }

  const title = $headerInput.value;
  const $titleContainer = $headerInput.parentElement;
  const sectionId = $titleContainer.closest(".column__container").id;

  todoStore.columnUpdate({ sectionId, title });
};
