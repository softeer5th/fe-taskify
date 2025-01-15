import closed from "../../public/closed.js";
import edit from "../../public/edit.js";

export default function TaskView({ task, state, onFirstButtonClicked, onSecondButtonClicked }) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.id = task.id;

  if (state === "editing") {
    taskElement.classList.add("task--edit");

    const contentBody = document.createElement("div");
    contentBody.classList.add("task__content-body");
    contentBody.addEventListener("input", (event) => {
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

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.addEventListener("click", onFirstButtonClicked);

    const saveButton = document.createElement("button");
    saveButton.textContent = "등록";
    saveButton.addEventListener("click", onSecondButtonClicked);
    saveButton.disabled = task.name.length === 0 || task.description.length === 0;

    editorButton.appendChild(cancelButton);
    editorButton.appendChild(saveButton);

    contentBody.appendChild(contentTitle);
    contentBody.appendChild(contentDescription);
    contentBody.appendChild(editorButton);

    taskElement.appendChild(contentBody);
  } else {
    const content = document.createElement("div");
    content.classList.add("task__content");

    const contentBody = document.createElement("div");
    contentBody.classList.add("task__content-body");

    const contentTitle = document.createElement("div");
    contentTitle.classList.add("task__content-title");
    contentTitle.textContent = task.name;

    const contentDescription = document.createElement("div");
    contentDescription.classList.add("task__content-description");
    contentDescription.textContent = task.description;

    contentBody.appendChild(contentTitle);
    contentBody.appendChild(contentDescription);

    const contentDevice = document.createElement("span");
    contentDevice.classList.add("task__content-device");
    contentDevice.textContent = `author by ${task.device}`;

    content.appendChild(contentBody);
    content.appendChild(contentDevice);

    taskElement.appendChild(content);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("task__iconButton");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task__iconButton-icon");
    deleteButton.innerHTML = closed;
    deleteButton.addEventListener("click", onFirstButtonClicked);
    deleteButton.addEventListener("mousedown", (event) => event.stopPropagation());

    const editButton = document.createElement("button");
    editButton.classList.add("task__iconButton-icon");
    editButton.innerHTML = edit;
    editButton.addEventListener("click", onSecondButtonClicked);
    editButton.addEventListener("mousedown", (event) => event.stopPropagation());

    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(editButton);

    taskElement.appendChild(buttonGroup);
  }

  return taskElement;
}
