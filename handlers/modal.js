import createInputModal from "../components/Modal/createInputModal.js";
import historyStore from "../store/historyStore.js";
import todoStore from "../store/TodoStore.js";
import { deleteColumnItem } from "./columnItem.js";

export const handleClose = (e) => {
  const $modal = e.target.closest("#modal");

  if ($modal) {
    $modal.remove();
  }
};

export const handleDeleteCard = (e) => {
  const itemId = Number(e.target.closest("#modal-container").dataset.itemId);
  const $columnItem = document.querySelector(
    `.column__item[data-id="${itemId}"]`
  );
  const sectionId = $columnItem.closest(".column__container").id;
  deleteColumnItem({ sectionId, itemId });
  handleClose(e);
};

export const deleteHistory = (e) => {
  historyStore.clear();
  handleClose(e);
};

export const handleAddColumn = () => {
  createInputModal();
};

export const addColumn = (e) => {
  const title = e.target
    .closest("#modal")
    .querySelector(".modal__titleInput")
    .value.trim();

  todoStore.columnAdd({
    title: title ?? "새로운 칼럼",
  });

  handleClose(e);
};

export const deleteColumn = (e) => {
  const sectionId = e.target.closest("#modal-container").dataset.sectionId;

  todoStore.columnDelete({ sectionId });
  handleClose(e);
};
