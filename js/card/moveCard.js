import { moveTask } from "../../utils/storage/taskManager.js";

export const dragStartCard = (target) => {
  target.classList.add("dragging");

  const startColumnKey = target
    .closest(".column")
    .getAttribute("data-column-key");

  target.setAttribute("data-start-column", startColumnKey);
};

export const dragoverCard = (e) => {
  e.preventDefault();
  const draggingCard = document.querySelector(".dragging");
  const columns = document.querySelectorAll(".column");

  if (!draggingCard || !columns) return;

  columns.forEach((column) => {
    if (e.target.closest(".column") === column) {
      const cards = [...column.querySelectorAll(".task:not(.dragging)")];
      const afterCard = cards.find((card) => {
        const rect = card.getBoundingClientRect();
        return e.clientY <= rect.top + rect.height / 2;
      });

      if (afterCard) {
        column.insertBefore(draggingCard, afterCard);
        moveTask(
          parseInt(draggingCard.getAttribute("data-timestamp")),
          parseInt(draggingCard.getAttribute("data-start-column")),
          parseInt(column.getAttribute("data-column-key"))
        );
      } else {
        column.appendChild(draggingCard);
        moveTask(
          parseInt(draggingCard.getAttribute("data-timestamp")),
          parseInt(draggingCard.getAttribute("data-start-column")),
          parseInt(column.getAttribute("data-column-key"))
        );
      }
    }
  });
};

export const dragendCard = (target) => {
  target.classList.remove("dragging");
  const startColNum = target.getAttribute("data-start-column");
  const startCol = document.querySelector(
    `.column[data-column-key="${startColNum}"]`
  );
  startCol.querySelector(".column-count").textContent--;
  const endCol = target.closest(".column").querySelector(".column-count")
    .textContent++;

  target.removeAttribute("data-start-column");
};
