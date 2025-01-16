import Button from "../component/button.js";

export default function EditTaskItem({ task, onClickCancelButton, onClickSaveButton }) {
  const editTaskItem = document.createElement("div");
  editTaskItem.classList.add("task");
  editTaskItem.classList.add("task--edit");
  editTaskItem.id = task.id;

  const contentBody = document.createElement("div");
  contentBody.classList.add("task__content-body");
  contentBody.addEventListener("input", () => {
    const title = contentTitle.value;
    const description = contentDescription.value;

    if (title.length > 0 && description.length > 0) {
      saveButton.disabled = false;
    } else {
      saveButton.disabled = true;
    }
  });

  const contentTitle = document.createElement("input");
  contentTitle.setAttribute("type", "text");
  contentTitle.classList.add("task__content-title");
  contentTitle.placeholder = "제목을 입력하세요";
  contentTitle.maxLength = 500;
  contentTitle.required = true;
  contentTitle.value = task.name || "";
  contentTitle.addEventListener("click", (event) => {
    event.stopPropagation();
    event.target.focus();
  });

  const contentDescription = document.createElement("textarea");
  contentDescription.classList.add("task__content-description");
  contentDescription.maxLength = 500;
  contentDescription.required = true;
  contentDescription.placeholder = "내용을 입력하세요";
  contentDescription.addEventListener("click", (event) => {
    event.stopPropagation();
    event.target.focus();
  });
  contentDescription.value = task.description || "";

  const editorButton = document.createElement("div");
  editorButton.classList.add("task__editorButton");

  const cancelButton = Button({
    className: ["button", "button-alt"],
    onClick: onClickCancelButton,
    children: ["취소"],
  });

  const saveButton = Button({
    className: ["button"],
    onClick: onClickSaveButton,
    children: ["저장"],
  });
  saveButton.disabled = task.name.length === 0 || task.description.length === 0;

  editorButton.appendChild(cancelButton);
  editorButton.appendChild(saveButton);

  contentBody.appendChild(contentTitle);
  contentBody.appendChild(contentDescription);
  contentBody.appendChild(editorButton);

  editTaskItem.appendChild(contentBody);

  return editTaskItem;
}
