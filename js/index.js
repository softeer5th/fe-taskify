import { todoCardComponent } from "./component/card.js";
const todoAddButton = document.querySelector(".todo-add-icon");
const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");
const todoAddBtn = document.querySelector(".todo-add-btn");
const todoFormCard = document.querySelector(".new-card");

todoAddButton.addEventListener("click", () => {
  todoFormCard.classList.toggle("display-none");
});

const todoFormInit = () => {
  todoTitle.value = ""; // form 초기화
  todoContent.value = ""; // form 초기화
};

todoAddBtn.addEventListener("click", () => {
  const todoTitleText = todoTitle.value;
  const todoContentText = todoContent.value;

  todoFormCard.classList.toggle("display-none"); // 입력 폼은 다시 안보이도록.

  const parser = new DOMParser();

  const todoCardDoc = parser.parseFromString(
    todoCardComponent(todoTitleText, todoContentText),
    "text/html"
  );
  const todoCardElement = todoCardDoc.body.firstChild;

  // newform 카드 바로 뒤에 추가
  todoFormCard.after(todoCardElement);
  todoFormInit();
});

// next > new 제목과 내용 입력이 다 되면 등록 버튼 활성화. 이전에는 disabled.
