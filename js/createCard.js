import { card } from "../components/card.js";
import { addStorage } from "../store/workList.js";
import { updateCardCount } from "./cardNavbar.js";

const NUMBER_OF_CARD_FORM_PER_SECTION = 1;

const todoFormInit = (formCard) => {
  // form 초기화
  formCard.classList.toggle("display-none"); // 입력 폼은 다시 안보이도록.
  formCard.querySelector(".title").value = "";
  formCard.querySelector(".content").value = "";
};

const addCard = (formCard, sectionType) => {
  const titleText = formCard.querySelector(".title").value;
  const contentText = formCard.querySelector(".content").value;

  const CARD_ID = Date.now();
  const cardDoc = card(CARD_ID, titleText, contentText);
  cardDoc.querySelector(".title").disabled = true;
  cardDoc.querySelector(".content").disabled = true;
  // newform 카드 바로 뒤에 추가
  formCard.after(cardDoc);

  const currentCardList = document
    .querySelector(`.${sectionType}-wrapper`)
    .querySelector(".card-container")
    .querySelectorAll(".card");

  addStorage(sectionType, titleText, contentText, CARD_ID);
  todoFormInit(formCard); // 입력했던 값을 다시 빈 문자열로 초기화.

  updateCardCount(
    sectionType,
    currentCardList.length - NUMBER_OF_CARD_FORM_PER_SECTION
  );
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
  addCard(formCard, sectionType);
});

columnArea.addEventListener("click", (e) => {
  const submitBtn = e.target.closest(".add-icon");

  if (submitBtn) {
    // 등록버튼
    const sectionType = submitBtn.dataset.section;
    const formCard = document.querySelector(`.${sectionType}-form-card`);
    showCardForm(formCard);
  }

  // 취소 버튼.
  if (e.target.matches(".cancel-btn")) {
    const formCard = e.target.closest(".form-card"); // 버튼을 누른 카드 찾기.
    if (formCard) {
      todoFormInit(formCard);
    }
  }
});
