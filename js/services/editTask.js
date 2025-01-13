import TaskDataStore from "../stores/TaskDataStore.js";

export default function editTask({
  columnId,
  taskId,
  taskEditCard,
  $taskCard,
}) {
  const $inputTitle = taskEditCard.querySelector(".task-edit-card__title");
  const $inputContent = taskEditCard.querySelector(".task-edit-card__content");

  // TaskDataStore를 통해 task 수정
  TaskDataStore.editTask({
    columnId,
    taskId,
    taskTitle: $inputTitle.value,
    taskContent: $inputContent.value,
  });

  // 기존 카드의 내용만 업데이트
  $taskCard.querySelector(".task-card__title").innerText = $inputTitle.value;
  $taskCard.querySelector(".task-card__content").innerText =
    $inputContent.value;

  // 수정 카드를 기존 카드로 교체
  taskEditCard.replaceWith($taskCard);
}
