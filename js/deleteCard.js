import { modal } from "../components/modal.js";
import { deleteCardFormStorage } from "../store/workList.js";
const cardContainer = document.querySelectorAll(".card-container");

let [cardIdToDelete, sectionToDelete] = ["", ""];

const showDeleteModal = () => {
  const root = document.querySelector("#root");
  root.appendChild(modal("선택한 카드를 삭제할까요?"));

  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.classList.toggle("display-none");
};

cardContainer.forEach((container) => {
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card"); // 버튼을 누른 카드 찾기.
    const sectionType = card.closest("section").className.split("-")[0]; // 어떤 칼럼 영역인지.
    cardIdToDelete = card.id;
    sectionToDelete = sectionType;

    if (e.target.matches(".card-delete-icon")) {
      // 삭제 아이콘을 눌렀다면
      showDeleteModal();
    }
  });
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

  deleteCardFormStorage(cardIdToDelete, sectionToDelete);
};

const closeDeleteModal = () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.classList.toggle("display-none");
};

// 모달 배경을 상위 요소로 이벤트 위임
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-cancel-btn")) {
    closeDeleteModal();
  }

  if (event.target.classList.contains("modal-delete-btn")) {
    deleteCard();
    closeDeleteModal();
  }
});

// if (e.target.matches(".save-btn") || e.target.matches(".cancel-btn")) {
//     backToCard(card);
//   }

//   if (e.target.matches(".save-btn")) {
//     // 저장
//     if (
//       previousTitle === cardTitle.value &&
//       previousContent === cardContent.value
//     ) {
//       return;
//     }
//     editStorage(sectionType, card.id, cardTitle.value, cardContent.value);
//   }

//   if (e.target.matches(".cancel-btn")) {
//     // 취소 버튼이라면, 이전 값을 저장.
//     cardTitle.value = previousTitle;
//     cardContent.value = previousContent;
//   }
