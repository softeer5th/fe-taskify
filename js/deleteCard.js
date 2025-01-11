import { modal } from "../components/modal.js";
import { deleteCardFormStorage } from "../store/workList.js";
import { updateCardCount } from "./cardNavbar.js";
const cardContainer = document.querySelectorAll(".card-container");

let [cardIdToDelete, sectionToDelete] = ["", ""];

const NUMBER_OF_CARD_FORM_PER_SECTION = 1;

const showDeleteModal = () => {
  const root = document.querySelector("#root");
  root.appendChild(modal("선택한 카드를 삭제할까요?"));

  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.classList.toggle("display-none");
};

const deleteCardHandler = (e) => {
  const card = e.target.closest(".card"); // 버튼을 누른 카드 찾기.
  const sectionType = card.closest("section").className.split("-")[0]; // 어떤 칼럼 영역인지.
  cardIdToDelete = card.id;
  sectionToDelete = sectionType;

  if (e.target.matches(".card-delete-icon")) {
    // 삭제 아이콘을 눌렀다면
    showDeleteModal();
  }
};

cardContainer.forEach((container) => {
  container.addEventListener("click", deleteCardHandler);
});

const deleteCard = () => {
  const cardContainer = document
    .querySelector(`.${sectionToDelete}-wrapper`)
    .querySelector(".card-container");
  const cardList = document
    .querySelector(`.${sectionToDelete}-wrapper`)
    .querySelector(".card-container")
    .querySelectorAll(".card");

  cardList.forEach((card) => {
    if (card.id === cardIdToDelete) {
      cardContainer.removeChild(card);
    }
  });

  const cardLengthAfterDelete =
    cardList.length - NUMBER_OF_CARD_FORM_PER_SECTION - 1;

  deleteCardFormStorage(cardIdToDelete, sectionToDelete);
  updateCardCount(sectionToDelete, cardLengthAfterDelete);
};

const closeDeleteModal = () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.classList.toggle("display-none");
};

const deleteModalHandler = (e) => {
  if (e.target.classList.contains("modal-cancel-btn")) {
    closeDeleteModal();
  }

  if (e.target.classList.contains("modal-delete-btn")) {
    deleteCard();
    closeDeleteModal();
  }
};

// 모달 배경을 상위 요소로 이벤트 위임
document.body.addEventListener("click", deleteModalHandler);
