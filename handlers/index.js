import { ACTION_TYPE } from "../constants/action.js";
import {
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  handleDrop,
} from "./columnBody.js";
import {
  handleCancelAdd,
  handleClickAdd,
  handleClickInputOutside,
  handleDbClickColumnHeader,
  handleDeleteColumn,
} from "./columnHeader.js";
import {
  handleCancelEdit,
  handleInputContent,
  handleInputTitle,
  handleSubmit,
} from "./columnInputItem.js";
import { handleClickDelete, handleClickEdit } from "./columnItem.js";
import {
  addColumn,
  deleteColumn,
  deleteHistory,
  handleAddColumn,
  handleClose,
  handleDeleteCard,
} from "./modal.js";
import { handleClickDeleteHistory } from "./userHistory.js";

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
    const $deleteHistoryButton = target.closest(
      ".history__footer .delete__button"
    );

    const $addColumnButton = e.target.closest(".floating__button");
    const $deleteColumnButton = e.target.closest(".column__deleteButton");

    const $headerInput = e.target.closest(".header__input");

    if ($addButton) {
      handleClickAdd(e, store);
    } else if ($deleteHistoryButton) {
      handleClickDeleteHistory();
    } else if ($deleteButton) {
      const type = $deleteButton.dataset.type;
      handleClickDelete(e, type);
    } else if ($editButton) {
      handleClickEdit(e);
    } else if ($closeButton) {
      const type = $closeButton.dataset.type;
      type === ACTION_TYPE.add
        ? handleCancelAdd(e, store)
        : handleCancelEdit(e, store, type);
    } else if ($submitButton) {
      const type = $submitButton.dataset.type;
      handleSubmit(e, store, type);
    } else if ($addColumnButton) {
      handleAddColumn();
    } else if ($deleteColumnButton) {
      handleDeleteColumn(e);
    } else if (!$headerInput) {
      handleClickInputOutside();
    }
  });

  $root.addEventListener("dblclick", (e) => {
    const $columnTitleHeader = e.target.closest(
      ".column__header__titleContainer"
    );

    if ($columnTitleHeader) {
      handleDbClickColumnHeader(e);
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
    const $columnAddButton = target.closest(".add__button");

    if ($dimmed || $cancelButton) {
      handleClose(e);
    } else if ($deleteButton) {
      const type = $deleteButton.dataset.type;

      switch (type) {
        case "card":
          handleDeleteCard(e);
          break;
        case "history":
          deleteHistory(e);
          break;

        case "column":
          deleteColumn(e);
          break;
      }
    } else if ($columnAddButton) {
      addColumn(e);
    }
  });
};
