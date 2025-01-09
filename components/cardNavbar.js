import { parseToDoc } from "../utils/parseToDoc.js";
const TITLE_TEXT = {
  todo: "해야할 일",
  doing: "하고 있는 일",
  done: "완료한 일",
};
export const cardNavbar = (sectionType, count = 0) => {
  const cardNavbarHTML = /*html */ `   
  <!-- 카드를 추가하는 navbar -->
    <div class="add-container">
      <div class="add-container-text">
        <div class="container-title text-bold">${TITLE_TEXT[sectionType]}</div>
        <div class="card-count text-weak">${count}</div>
      </div>
      <div class="add-container-icon">
        <button class="add-icon todo-add-icon" data-section="${sectionType}">
          <img src="./assets/icons/add.svg" alt="" />
        </button>
        <button class="delete-icon">
          <img src="./assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </div>`;

  return parseToDoc(cardNavbarHTML);
};
