import loadStyleSheet from "../../utils/loadStyleSheet.js";
import ColumnInputItem from "../ColumnInputItem/ColumnInputItem.js";
import createColumnHeader from "./ui/createColumnHeader.js";

loadStyleSheet("/components/ColumnHeader/styles.css");

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
    const $columnItemInput = ColumnInputItem({ store, handleCancel });
    $columnBody.prepend($columnItemInput);
    store.isTodoAdding = true;
  };

  return createColumnHeader({
    title,
    count: items.length,
    handleClickAdd,
  });
};

export default ColumnHeader;
