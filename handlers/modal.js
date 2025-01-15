import historyStore from "../store/historyStore.js";
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
