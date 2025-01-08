import { todoCardComponent } from "./component/card.js";
const todoAddButton = document.querySelector(".todo-add-icon");
const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");
const todoSubmitBtn = document.querySelector(".todo-add-btn");
const todoFormCard = document.querySelector(".new-card");

const todoFormInit = () => {
  // form 초기화
  todoFormCard.classList.toggle("display-none"); // 입력 폼은 다시 안보이도록.
  todoTitle.value = "";
  todoContent.value = "";
};

const addCard = () => {
  const todoTitleText = todoTitle.value;
  const todoContentText = todoContent.value;

  const parser = new DOMParser();

  const todoCardDocument = parser.parseFromString(
    todoCardComponent(todoTitleText, todoContentText),
    "text/html"
  );

  const todoCardElement = todoCardDocument.body.firstChild;

  // newform 카드 바로 뒤에 추가
  todoFormCard.after(todoCardElement);

  todoFormInit(); // 입력했던 값을 다시 빈 문자열로 초기화.
};

const showCardForm = () => {
  todoFormCard.classList.toggle("display-none");
};

todoAddButton.addEventListener("click", showCardForm);

todoSubmitBtn.addEventListener("click", addCard);

// next > new 제목과 내용 입력이 다 되면 등록 버튼 활성화. 이전에는 disabled.
