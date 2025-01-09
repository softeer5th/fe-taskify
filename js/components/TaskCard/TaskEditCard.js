import Button from "../Button/Button.js";

export default function TaskEditCard() {
  const titleChangeHandler = (event) => {
    toggleSaveButton();
  };

  const contentChangeHandler = (event) => {
    toggleSaveButton();
    autoResizeTextarea(event.target);
  };

  const toggleSaveButton = () => {
    const saveButton = document.querySelector(".task-edit-card__save-button");
    const inputTitle = document.querySelector(".task-edit-card__title");
    const inputContent = document.querySelector(".task-edit-card__content");

    if (inputTitle.value === "" || inputContent.value === "") {
      saveButton.setAttribute("disabled", "true");
    } else {
      saveButton.removeAttribute("disabled");
    }
  };

  const saveHandler = () => {
    const inputTitle = document.querySelector(".task-edit-card__title");
    const inputContent = document.querySelector(".task-edit-card__content");

    // TODO: {inputTitle, inputContent} localStorage에 저장
    taskEditCard.style.display = "none";
    inputTitle.value = "";
    inputContent.value = "";
  };

  const cancelHandler = () => {
    taskEditCard.style.display = "none";
    inputTitle.value = "";
    inputContent.value = "";
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const taskEditCard = document.createElement("div");
  taskEditCard.classList.add("task-edit-card");

  const inputTitle = document.createElement("input");
  inputTitle.classList.add("task-edit-card__title", "display-bold14");
  inputTitle.placeholder = "제목을 입력하세요";
  inputTitle.addEventListener("input", titleChangeHandler);

  const inputContent = document.createElement("textarea");
  inputContent.classList.add("task-edit-card__content");
  inputContent.placeholder = "내용을 입력하세요";
  inputContent.addEventListener("input", contentChangeHandler);

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("task-edit-card__buttons-wrapper");

  const saveButton = Button({
    format: "text",
    style: "brand",
    children: document.createTextNode("등록"),
    disabled: true,
    onClick: saveHandler,
  });
  saveButton.classList.add("task-edit-card__save-button");

  const cancelButton = Button({
    format: "text",
    children: document.createTextNode("취소"),
    onClick: cancelHandler,
  });

  buttonsWrapper.append(cancelButton, saveButton);
  taskEditCard.append(inputTitle, inputContent, buttonsWrapper);

  const showCard = () => {
    taskEditCard.style.display = "block";
    inputTitle.focus();
  };

  return { taskEditCard, showCard };
}
