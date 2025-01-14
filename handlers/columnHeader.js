import ColumnInputItem from "../components/ColumnInputItem/ColumnInputItem.js";

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
