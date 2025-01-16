import { closeCardModal, makeCard, popupCardModal } from "./card/addCard.js";
import {
  getColumnTasks,
  getTaskByTimestamp,
  removeTask,
} from "../utils/storage/taskManager.js";
import { setDefaultColumn } from "./setColumn.js";
import { editCard, closeEditModal } from "./card/editCard.js";
import { sort } from "./sort.js";
import { dragendCard, dragoverCard, dragStartCard } from "./card/moveCard.js";
import { showHistoryModal } from "./history/historyModal.js";
import {
  addHistory,
  clearHistory,
  getHistory,
} from "../utils/storage/historyManager.js";
import { showWarningModal } from "../utils/storage/warningModal.js";

document.addEventListener("DOMContentLoaded", () => {
  setDefaultColumn();

  const columns = document.querySelectorAll(".column");
  columns.forEach((column) => {
    const columnKey = column.getAttribute("data-column-key");
    const tasks = getColumnTasks(columnKey);
    if (!tasks) return;
    tasks.forEach((task) => {
      makeCard(task, column);
    });
  });
});

document.addEventListener("click", ({ target }) => {
  // 이벤트 위임 & 이벤트 객체 분해
  const parentColumn = target.closest(".column");
  const task = target.closest(".task");

  if (target.closest(".add-btn")) {
    // + 버튼 클릭시
    popupCardModal(parentColumn);
  } else if (target.classList.contains("task-add-add-btn")) {
    // 등록 버튼 클릭시
    const title = parentColumn.querySelector("input").value;
    const body = parentColumn.querySelector("input:last-child").value;
    const task = {
      title: title,
      body: body,
      author: "me",
      timestamp: Date.now(),
    };
    makeCard(task, parentColumn);

    addHistory(
      task.timestamp,
      "ADD",
      task.title,
      parentColumn.getAttribute("data-column-key"),
      "empty"
    );
  } else if (target.classList.contains("task-add-can-btn")) {
    closeCardModal(parentColumn);
  } else if (target.closest(".sort-btn")) {
    sort(target.closest(".sort-btn").getAttribute("card-sort"));
  } else if (target.closest(".card-close-btn")) {
    showWarningModal("선택한 카드를 삭제할까요?", "task-for-delete");
    task.setAttribute("ready-for-deleted", "");
  } else if (target.closest(".card-edit-btn")) {
    editCard(task);
  } else if (target.closest(".task-edit-add-btn")) {
    closeEditModal(true, task);
    const storedTask = getTaskByTimestamp(
      task.closest(".column").getAttribute("data-column-key"),
      parseInt(task.getAttribute("data-timestamp"))
    );

    addHistory(
      storedTask.timestamp,
      "EDIT",
      storedTask.title,
      parentColumn.getAttribute("data-column-key"),
      "empty"
    );
  } else if (target.closest(".task-edit-can-btn")) {
    closeEditModal(false, task);
  } else if (target.closest(".history-btn")) {
    showHistoryModal();
  } else if (target.closest(".history-modal-close-btn")) {
    showHistoryModal();
  } else if (target.closest(".history-modal-footer")) {
    if (showWarningModal("모든 사용자 기록을 삭제할까요?", "history"))
      clearHistory();
  } else if (target.closest(".warning-modal-confirm-btn")) {
    document.querySelector(".warning-modal").remove();
  } else if (target.closest(".warning-modal-cancel-btn")) {
    if (target.closest(".history")) {
      //히스토리 지우기 로직

      document.querySelector(".warning-modal").remove();

      clearHistory();
    } else if (target.closest(".task-for-delete")) {
      // 카드 지우기 로직

      document.querySelector(".warning-modal").remove();
      const dyingTask = document.querySelector(".task[ready-for-deleted]");
      const colForDyingTask = dyingTask
        .closest(".column")
        .getAttribute("data-column-key");

      addHistory(
        dyingTask.timestamp,
        "DELETE",
        dyingTask.title,
        colForDyingTask,
        "empty"
      );
      removeTask(
        dyingTask.closest(".column").getAttribute("data-column-key"),
        dyingTask.getAttribute("data-timestamp")
      );
      dyingTask.closest(".column").querySelector(".column-count").textContent--;
      dyingTask.remove();
    }
  }
});

document.addEventListener("input", ({ target }) => {
  const task = target.closest(".task");
  if (task) {
    let saveButton = task.querySelector(".task-edit-add-btn"); // .task-edit-add-btn 선택
    if (saveButton) {
    } else {
      saveButton = task.querySelector(".task-add-add-btn"); // .task-edit-add-btn 선택
    }
    saveButton.style.opacity = "1"; // 버튼의 opacity를 1로 설정
  }
});

//드래그
document.addEventListener("dragstart", ({ target }) => {
  if (target.closest(".card-edit-btn") || target.closest(".card-close-btn"))
    return;

  dragStartCard(target);
});

document.addEventListener("dragend", ({ target }) => {
  dragendCard(target);
});

document.addEventListener("dragover", (e) => {
  dragoverCard(e);
});
