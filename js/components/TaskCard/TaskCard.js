import Button from "../Button/Button.js";
import createImg from "../../utils/createImg.js";
import deleteTask from "../../services/deleteTask.js";

export default function TaskCard({ taskId, taskTitle, taskContent }) {
  /** editBtnClickHandler: task card 수정 버튼을 클릭했을 때 호출됩니다. */
  const editBtnClickHandler = () => {};

  /** ($taskCard) -> ($taskCardDetails), ($taskCardButtons) */
  const $taskCard = document.createElement("li");
  $taskCard.className = "task-card";
  $taskCard.id = `task-card-${taskId}`;

  /** ($taskCardDetails) -> ($taskCardTitle), ($taskCardContent) */
  const $taskCardDetails = document.createElement("div");
  $taskCardDetails.classList.add("task-card__details");

  const $taskCardTitle = document.createElement("div");
  $taskCardTitle.classList.add(
    "task-card__title",
    "display-bold14",
    "text-strong"
  );
  $taskCardTitle.innerText = taskTitle;

  const $TaskCardContent = document.createElement("div");
  $TaskCardContent.classList.add(
    "task-card__content",
    "display-medium14",
    "text-default"
  );
  $TaskCardContent.innerText = taskContent;

  /** ($taskCardButtons) -> ($deleteButton), ($editButton) */
  const $taskCardButtons = document.createElement("div");
  $taskCardButtons.classList.add("task-card__buttons");

  const $deleteButton = Button({
    format: "icon",
    children: createImg({
      src: "/assets/icons/closed.svg",
      alt: "delete button",
      classList: ["task-card__delete-button"],
    }),
  });
  $deleteButton.classList.add("task-card__delete-button");

  const $editButton = Button({
    format: "icon",
    onClick: editBtnClickHandler,
    children: createImg({
      src: "/assets/icons/edit.svg",
      alt: "edit button",
      classList: ["task-card__edit-button"],
    }),
  });
  $editButton.classList.add("task-card__edit-button");

  $taskCardDetails.append($taskCardTitle, $TaskCardContent);
  $taskCardButtons.append($deleteButton, $editButton);
  $taskCard.append($taskCardDetails, $taskCardButtons);

  return $taskCard;
}
