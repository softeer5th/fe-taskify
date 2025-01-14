import TaskColumnHeader from "./TaskColumnHeader/TaskColumnHeader.js";
import TaskEditCard from "../TaskCard/TaskEditCard.js";
import TaskColumnBody from "./TaskColumnBody/TaskColumnBody.js";
import saveTask from "../../services/saveTask.js";
import deleteTask from "../../services/deleteTask.js";
import editTask from "../../services/editTask.js";

export default function TaskColumn({ columnId, columnTitle, taskList = [] }) {
  const $column = document.createElement("div");
  $column.classList.add("task-column");

  /** event listener */
  $column.addEventListener("click", (event) => {
    const target = event.target;
    const classList = target.classList;

    // 새로운 작업 추가
    if (classList.contains(`task-edit-card__save-button`)) {
      const $taskEditCard = target.closest(`.task-edit-card`);
      if (!$taskEditCard.dataset.taskId) {
        const $inputTitle = $taskEditCard?.querySelector(
          `.task-edit-card__title`
        );
        const $inputContent = $taskEditCard?.querySelector(
          `.task-edit-card__content`
        );

        saveTask({
          columnId,
          taskTitle: $inputTitle.value,
          taskContent: $inputContent.value,
          taskEditCard: $taskEditCard,
        });
        taskEditCardInstance.resetTaskEditCard($taskEditCard);
      }
    }
    // 작업 추가/수정 취소
    else if (classList.contains(`task-edit-card__cancel-button`)) {
      const $taskEditCard = target.closest(`.task-edit-card`);
      const taskId = $taskEditCard.dataset.taskId;

      if (taskId) {
        // 수정 중이었던 경우: 원래 TaskCard로 복구
        const taskTitle = $taskEditCard.dataset.originalTitle;
        const taskContent = $taskEditCard.dataset.originalContent;

        const $originalTaskCard = TaskCard({
          taskId: Number(taskId),
          taskTitle,
          taskContent,
        });

        $taskEditCard.replaceWith($originalTaskCard);
      } else {
        // 새로운 작업 추가 중이었던 경우: 입력 폼 초기화
        taskEditCardInstance.resetTaskEditCard($taskEditCard);
      }
    }
    // task card 삭제
    else if (classList.contains(`task-card__delete-button`)) {
      const $taskCard = target.closest(`.task-card`);
      const taskId = $taskCard.id.slice(10);
      deleteTask({ taskId: Number(taskId) });
      $taskCard.remove();
    }
    // task card 수정
    else if (classList.contains(`task-card__edit-button`)) {
      const $taskCard = target.closest(`.task-card`);
      const taskId = Number($taskCard.id.slice(10));
      const taskTitle = $taskCard.querySelector(`.task-card__title`).innerText;
      const taskContent =
        $taskCard.querySelector(`.task-card__content`).innerText;

      const editCardInstance = TaskEditCard({
        columnId,
        taskId,
        taskTitle,
        taskContent,
      });

      // 수정 중임을 표시하기 위해 taskId와 원본 데이터를 data 속성으로 추가
      editCardInstance.taskEditCard.dataset.taskId = taskId;
      editCardInstance.taskEditCard.dataset.originalTitle = taskTitle;
      editCardInstance.taskEditCard.dataset.originalContent = taskContent;

      $taskCard.replaceWith(editCardInstance.taskEditCard);
      editCardInstance.showTaskEditCard();

      editCardInstance.taskEditCard
        .querySelector(".task-edit-card__save-button")
        .addEventListener("click", () => {
          editTask({
            columnId,
            taskId,
            taskEditCard: editCardInstance.taskEditCard,
            $taskCard,
          });
        });
    }
  });

  const taskEditCardInstance = TaskEditCard({ columnId });
  const $taskEditCard = taskEditCardInstance.taskEditCard;
  $taskEditCard.style.display = "none";

  const addTaskHandler = () => {
    console.log("add task");
    $taskEditCard.style.display = "block";
    taskEditCardInstance.showTaskEditCard();
  };

  const deleteColumnHandler = () => {
    console.log("delete column");
  };

  const $taskColumnHeader = TaskColumnHeader({
    columnTitle,
    taskListLength: taskList.length,
    onAddTask: addTaskHandler,
    onDeleteColumn: deleteColumnHandler,
  });

  const $taskColumnBody = TaskColumnBody({
    columnId,
    taskList,
    taskEditCard: $taskEditCard,
  });

  $column.append($taskColumnHeader, $taskColumnBody);

  return $column;
}
