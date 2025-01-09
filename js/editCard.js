import { editStorage } from "../store/workList.js";

const cardContainer = document.querySelectorAll(".card-container");

let [previousTitle, previousContent] = ["", ""];

const showEditCard = (targetCard) => {
  // 수정,삭제 아이콘이 사라지고, 취소 저장 버튼이 나옵니다.
  targetCard.querySelector(".name-of-device").classList.toggle("display-none");
  targetCard.querySelector(".card-icons").classList.toggle("display-none");
  targetCard.querySelector(".card-btn-box").classList.toggle("display-none");

  const cardTitle = targetCard.querySelector(".title");
  const cardContent = targetCard.querySelector(".content");
  previousTitle = cardTitle.value;
  previousContent = cardContent.value;

  cardTitle.disabled = false; // 수정할 수 있게 변경
  cardContent.disabled = false;
};

const backToCard = (targetCard) => {
  const cardTitle = targetCard.querySelector(".title");
  const cardContent = targetCard.querySelector(".content");
  targetCard.querySelector(".name-of-device").classList.toggle("display-none");
  targetCard.querySelector(".card-icons").classList.toggle("display-none");
  targetCard.querySelector(".card-btn-box").classList.toggle("display-none");

  cardTitle.disabled = true;
  cardContent.disabled = true;
};

cardContainer.forEach((container) => {
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card"); // 버튼을 누른 카드 찾기.
    const sectionType = card.closest("section").className.split("-")[0]; // 어떤 칼럼 영역인지.

    const cardTitle = card.querySelector(".title");
    const cardContent = card.querySelector(".content");

    if (e.target.matches(".card-edit-icon")) {
      // 편집 아이콘을 눌렀다면
      showEditCard(card);
    }

    if (e.target.matches(".save-btn") || e.target.matches(".cancel-btn")) {
      backToCard(card);
    }

    if (e.target.matches(".save-btn")) {
      // 저장
      if (
        previousTitle === cardTitle.value &&
        previousContent === cardContent.value
      ) {
        return;
      }
      editStorage(sectionType, card.id, cardTitle.value, cardContent.value);
    }

    if (e.target.matches(".cancel-btn")) {
      // 취소 버튼이라면, 이전 값을 저장.
      cardTitle.value = previousTitle;
      cardContent.value = previousContent;
    }
  });
});
