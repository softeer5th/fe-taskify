import {
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "./columnBody.js";
import { handleCancelAdd, handleClickAdd } from "./columnHeader.js";
import {
  handleCancelEdit,
  handleInputContent,
  handleInputTitle,
  handleSubmit,
} from "./columnInputItem.js";
import { handleClickDelete, handleClickEdit } from "./columnItem.js";
import { handleClose, handleDeleteModal } from "./modal.js";

const store = { isTodoAdding: false };

export const addRootEventListener = () => {
  const $root = document.getElementById("root");

  $root.addEventListener("click", (e) => {
    const target = e.target;
    const $addButton = target.closest(".add__button");
    const $deleteButton = target.closest(".delete__button");
    const $editButton = target.closest(".edit__button");

    const $closeButton = target.closest(".close__button");
    const $submitButton = target.closest(".submit__button");

    if ($addButton) {
      handleClickAdd(e, store);
    } else if ($deleteButton) {
      handleClickDelete(e);
    } else if ($editButton) {
      handleClickEdit(e);
    } else if ($closeButton) {
      const type = $closeButton.dataset.type;
      type === "add"
        ? handleCancelAdd(e, store)
        : handleCancelEdit(e, store, type);
    } else if ($submitButton) {
      const type = $submitButton.dataset.type;
      handleSubmit(e, store, type);
    }
  });

  $root.addEventListener("input", (e) => {
    const target = e.target;
    const $title = target.closest("#title");
    const $content = target.closest("#content");

    if ($title) {
      handleInputTitle(e);
    } else if ($content) {
      handleInputContent(e);
    }
  });

  $root.addEventListener("dragstart", (e) => {
    const target = e.target;
    const $column__body = target.closest(".column__body");

    if ($column__body) {
      handleDragStart(e);
    }
  });

  $root.addEventListener("dragend", (e) => {
    const target = e.target;
    const $column__body = target.closest(".column__body");

    if ($column__body) {
      handleDragEnd(e);
    }
  });

  $root.addEventListener("dragover", (e) => {
    const $columnItem = e.target.closest(".column__item");

    if ($columnItem) {
      handleDragOver(e);
    }
  });

  $root.addEventListener("drop", (e) => {
    const $columnItem = e.target.closest(".column__item");

    if ($columnItem) {
      handleDrop(e);
    }
  });
};

export const addModalEventListener = () => {
  const $modalContainer = document.getElementById("modal-container");

  $modalContainer.addEventListener("click", (e) => {
    const target = e.target;

    const $dimmed = target.closest(".modal__dimmed");
    const $cancelButton = target.closest(".cancel__button");
    const $deleteButton = target.closest(".delete__button");

    if ($dimmed || $cancelButton) {
      handleClose(e);
    } else if ($deleteButton) {
      handleDeleteModal(e);
    }
  });
};
