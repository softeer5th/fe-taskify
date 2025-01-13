import Button from "../Button/Button.js";
import saveTask from "../../services/saveTask.js";
import editTask from "../../services/editTask.js";

export default function TaskEditCard({
  columnId,
  taskId,
  taskTitle = "",
  taskContent = "",
}) {
  /** titleChangeHandler */
  const titleChangeHandler = (event) => {
    toggleSaveButton(event.target.closest(".task-edit-card"));
  };

  /** contentChangeHandler */
  const contentChangeHandler = (event) => {
    toggleSaveButton(event.target.closest(".task-edit-card"));
    autoResizeTextarea(event.target);
  };

  /** resetTaskEditCard: task를 저장 또는 입력을 취소하는 경우 실행됩니다. */
  const resetTaskEditCard = (taskEditCard) => {
    taskEditCard.style.display = "none";
    const inputTitle = taskEditCard.querySelector(".task-edit-card__title");
    const inputContent = taskEditCard.querySelector(".task-edit-card__content");

    inputTitle.value = "";
    inputContent.value = "";
    inputContent.style.height = "auto";
  };

  /** toggleSaveButton: title과 content가 모두 입력되었을 때 버튼을 활성화합니다. */
  const toggleSaveButton = (taskEditCard) => {
    const saveButton = taskEditCard.querySelector(
      ".task-edit-card__save-button"
    );
    const inputTitle = taskEditCard.querySelector(".task-edit-card__title");
    const inputContent = taskEditCard.querySelector(".task-edit-card__content");

    if (inputTitle.value === "" || inputContent.value === "") {
      saveButton.setAttribute("disabled", "true");
    } else {
      saveButton.removeAttribute("disabled");
    }
  };

  /** autoResizeTextarea: 입력된 콘텐츠 크기에 맞춰 입력 창의 높이를 조절합니다. */
  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  /** showCard: taskEditCard의 display 속성을 `block`으로 변경합니다. */
  const showTaskEditCard = () => {
    $taskEditCard.style.display = "block";
    $inputTitle.focus();
  };

  /** create elements and set up event handlers */
  const $taskEditCard = document.createElement("div");
  $taskEditCard.classList.add("task-edit-card");

  const $inputTitle = document.createElement("input");
  $inputTitle.classList.add("task-edit-card__title", "display-bold14");
  $inputTitle.placeholder = "제목을 입력하세요";
  $inputTitle.addEventListener("input", titleChangeHandler);
  $inputTitle.value = taskTitle;

  const $inputContent = document.createElement("textarea");
  $inputContent.classList.add("task-edit-card__content");
  $inputContent.placeholder = "내용을 입력하세요";
  $inputContent.addEventListener("input", contentChangeHandler);
  $inputContent.value = taskContent;

  const $buttonsWrapper = document.createElement("div");
  $buttonsWrapper.classList.add("task-edit-card__buttons-wrapper");

  const $saveButton = Button({
    format: "text",
    style: "brand",
    children: document.createTextNode("등록"),
    disabled: true,
  });
  $saveButton.classList.add("task-edit-card__save-button");

  const $cancelButton = Button({
    format: "text",
    children: document.createTextNode("취소"),
    onClick: () => resetTaskEditCard($taskEditCard),
  });
  $cancelButton.classList.add("task-edit-card__cancel-button");

  $buttonsWrapper.append($cancelButton, $saveButton);
  $taskEditCard.append($inputTitle, $inputContent, $buttonsWrapper);

  return {
    taskEditCard: $taskEditCard,
    showTaskEditCard: showTaskEditCard,
    resetTaskEditCard: resetTaskEditCard,
  };
}
