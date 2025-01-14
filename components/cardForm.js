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
    const titleLength = title.value.trim().length;
    const contentLength = content.value.trim().length;

    return titleLength > 0 && contentLength > 0 ? true : false;
  };

  const cardFormElement = parseToDoc(cardFormHTML);

  const title = cardFormElement.querySelector(".title");
  const content = cardFormElement.querySelector(".content");
  const addBtn = cardFormElement.querySelector(".add-btn");

  const updateAddButtonState = () => {
    if (isTitleAndContentHasValue(title, content)) {
      addBtn.disabled = false;
    } else {
      addBtn.disabled = true;
    }
  };

  title.addEventListener("input", updateAddButtonState);
  content.addEventListener("input", updateAddButtonState);

  return cardFormElement;
};
