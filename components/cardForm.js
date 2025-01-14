import { parseToDoc } from "../utils/parseToDoc.js";

export const cardForm = (sectionType) => {
  const cardFormHTML = /*html*/ `
    <li class="${sectionType}-form-card form-card card display-none">
    <div class="card-contents-icons-box">
      <div class="card-texts">
        <input
          class="title text-strong"
          placeholder="제목을 입력하세요"
          aria-placeholder="제목" />
        <input
          class="content text-default"
          placeholder="내용을 입력하세요"
          aria-placeholder="내용" />
      </div>
    </div>
    <div class="card-btn-box">
      <button class="cancel-btn">취소</button>
      <button class="add-btn todo-add-btn" data-section="${sectionType}">
        등록
      </button>
    </div>
  </li>
    `;

  const isTitleAndContentHasValue = (title, content) => {
    if (title.value.trim().length > 0 && content.value.trim().length > 0) {
      return true;
    }
    return false;
  };

  const cardFormElement = parseToDoc(cardFormHTML);

  const title = cardFormElement.querySelector(".title");
  const content = cardFormElement.querySelector(".content");

  const updateAddButtonState = () => {
    if (isTitleAndContentHasValue(title, content)) {
      cardFormElement.querySelector(".add-btn").disabled = false;
    } else {
      cardFormElement.querySelector(".add-btn").disabled = true;
    }
  };

  title.addEventListener("input", updateAddButtonState);
  content.addEventListener("input", updateAddButtonState);

  return cardFormElement;
};
