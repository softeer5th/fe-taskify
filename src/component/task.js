export default function task({ id, title, description, device }, editable = false) {
  const task = document.createElement("div");
  task.className = "task";
  task.dataset.taskId = id;

  const content = document.createElement("div");
  content.className = "task__content";

  if (editable) {
    const contentTitle = document.createElement("input");
    contentTitle.className = "task__content--title";
    contentTitle.placeholder = "제목을 입력하세요";
    contentTitle.value = title || "";

    const contentDescription = document.createElement("textarea");
    contentDescription.className = "task__content--description";
    contentDescription.placeholder = "내용을 입력하세요";
    contentDescription.value = description || "";

    const editorButton = document.createElement("div");
    editorButton.className = "task__content--editor";

    const cancelButton = document.createElement("button");
    cancelButton.className = "task__content--editor--cancel";
    cancelButton.textContent = "취소";

    const saveButton = document.createElement("button");
    saveButton.className = "task__content--editor--save";
    saveButton.textContent = "등록";

    editorButton.appendChild(cancelButton);
    editorButton.appendChild(saveButton);

    content.appendChild(contentTitle);
    content.appendChild(contentDescription);
    content.appendChild(editorButton);

    task.appendChild(content);
  } else {
    const contentTitle = document.createElement("div");
    contentTitle.className = "task__content--title";
    contentTitle.textContent = title;

    const contentDescription = document.createElement("div");
    contentDescription.className = "task__content--description";
    contentDescription.textContent = description;

    const contentDevice = document.createElement("div");
    contentDevice.className = "task__content--device";

    const deviceText = document.createElement("span");
    deviceText.textContent = `author by ${device}`;

    contentDevice.appendChild(deviceText);

    content.appendChild(contentTitle);
    content.appendChild(contentDescription);
    content.appendChild(contentDevice);

    const button = document.createElement("div");
    button.className = "task__button";

    const deleteButton = document.createElement("button");
    deleteButton.className = "task__button--delete";
    deleteButton.textContent = "×";

    const editButton = document.createElement("button");
    editButton.className = "task__button--edit";
    editButton.innerHTML = `<svg width="100%" height="100%" data-slot="icon" fill="none" stroke-width="1.5" stroke="#A0A3BD" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path>
    </svg>`;
    button.appendChild(deleteButton);
    button.appendChild(editButton);

    task.appendChild(content);
    task.appendChild(button);
  }

  return task;
}
