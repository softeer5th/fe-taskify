import { card } from "../components/card.js";
import { savedData, loadData } from "../store/workData.js";
const todoFormInit = (formCard) => {
  // form 초기화
  formCard.classList.toggle("display-none"); // 입력 폼은 다시 안보이도록.
  formCard.querySelector(".title").value = "";
  formCard.querySelector(".content").value = "";
};

const addToStorage = (sectionType, title, content) => {
  const workList = loadData();
  workList[sectionType].push({
    id: Date.now(),
    createdDate: new Date().toISOString(),
    title,
    content,
  });
  savedData(workList);
};

const addCard = (formCard, sectionType) => {
  const titleText = formCard.querySelector(".title").value;
  const contentText = formCard.querySelector(".content").value;
  const cardDoc = card(titleText, contentText);
  cardDoc.querySelector(".title").disabled = true;
  cardDoc.querySelector(".content").disabled = true;
  // newform 카드 바로 뒤에 추가
  formCard.after(cardDoc);

  addToStorage(sectionType, titleText, contentText);
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
  addCard(formCard, sectionType);
});

columnArea.addEventListener("click", (e) => {
  const submitBtn = e.target.closest(".add-icon");
  if (!submitBtn) return;

  const sectionType = submitBtn.dataset.section;
  const formCard = document.querySelector(`.${sectionType}-form-card`);
  showCardForm(formCard);
});
