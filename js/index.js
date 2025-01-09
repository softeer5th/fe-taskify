import { cardComponent } from "./component/card.js";
const todoAddButton = document.querySelector(".todo-add-icon");
const todoTitle = document.querySelector(".todo-title");
const todoContent = document.querySelector(".todo-content");
const todoSubmitBtn = document.querySelector(".todo-add-btn");
const todoFormCard = document.querySelector(".new-card");

const todoFormInit = (formCard) => {
  // form 초기화
  formCard.classList.toggle("display-none"); // 입력 폼은 다시 안보이도록.
  formCard.querySelector(".title").value = "";
  formCard.querySelector(".content").value = "";
};

const addCard = (formCard) => {
  const titleText = formCard.querySelector(".title").value;
  const contentText = formCard.querySelector(".content").value;

  const parser = new DOMParser();

  const cardDocument = parser.parseFromString(
    cardComponent(titleText, contentText),
    "text/html"
  );

  const cardElement = cardDocument.body.firstChild;

  // newform 카드 바로 뒤에 추가
  formCard.after(cardElement);

  todoFormInit(formCard); // 입력했던 값을 다시 빈 문자열로 초기화.
};

const showCardForm = (formCard) => {
  formCard.classList.toggle("display-none");
};

const columnArea = document.querySelector(".column-area");

columnArea.addEventListener("click", (e) => {
  const submitBtn = e.target.closest(".add-btn");
  if (!submitBtn) return;

  const sectionType = submitBtn.dataset.section;
  const formCard = document.querySelector(`.${sectionType}-form-card`);
  addCard(formCard);
});

columnArea.addEventListener("click", (e) => {
  const submitBtn = e.target.closest(".add-icon");
  if (!submitBtn) return;

  const sectionType = submitBtn.dataset.section;
  const formCard = document.querySelector(`.${sectionType}-form-card`);
  showCardForm(formCard);
});
