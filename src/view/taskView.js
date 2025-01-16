import icons from "../../asset/icon.js";

import Button from "../component/button.js";

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

    const cancelButton = Button({
      className: ["button", "button--alt"],
      onClick: onFirstButtonClicked,
      children: ["취소"],
    });

    const saveButton = Button({
      className: ["button"],
      onClick: onSecondButtonClicked,
      children: ["등록"],
    });
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
    deleteButton.appendChild(icons.closed());
    deleteButton.addEventListener("click", onFirstButtonClicked);
    deleteButton.addEventListener("mousedown", (event) => event.stopPropagation());

    const editButton = document.createElement("button");
    editButton.classList.add("task__iconButton-icon");
    editButton.appendChild(icons.edit());
    editButton.addEventListener("click", onSecondButtonClicked);
    editButton.addEventListener("mousedown", (event) => event.stopPropagation());

    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(editButton);

    taskElement.appendChild(buttonGroup);
  }

  return taskElement;
}
