import { closed } from "../../public/closed.js";
import { edit } from "../../public/edit.js";

export function TaskView({ task, state, onFirstButtonClicked, onSecondButtonClicked }) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.id = task.id;

  if (state === "editing") {
    taskElement.classList.add("task--edit");

    const contentBody = document.createElement("div");
    contentBody.classList.add("task__content-body");

    const contentTitle = document.createElement("input");
    contentTitle.classList.add("task__content-title");
    contentTitle.placeholder = "제목을 입력하세요";
    contentTitle.value = task.name;

    const contentDescription = document.createElement("textarea");
    contentDescription.classList.add("task__content-description");
    contentDescription.placeholder = "내용을 입력하세요";
    contentDescription.value = task.description;

    const editorButton = document.createElement("div");
    editorButton.classList.add("task__editorButton");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.addEventListener("click", onFirstButtonClicked);

    const saveButton = document.createElement("button");
    saveButton.textContent = "등록";
    saveButton.addEventListener("click", onSecondButtonClicked);

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

    const firstButton = document.createElement("button");
    firstButton.classList.add("task__iconButton-icon");
    firstButton.innerHTML = closed;
    firstButton.addEventListener("click", onFirstButtonClicked);

    const secondButton = document.createElement("button");
    secondButton.classList.add("task__iconButton-icon");
    secondButton.innerHTML = edit;
    secondButton.addEventListener("click", onSecondButtonClicked);

    buttonGroup.appendChild(firstButton);
    buttonGroup.appendChild(secondButton);

    taskElement.appendChild(buttonGroup);
  }

  if (state === "moving") {
    taskElement.classList.add("task--move");
  } else if (state === "dragging") {
    taskElement.classList.add("task--drag");
  }

  return taskElement;
}
