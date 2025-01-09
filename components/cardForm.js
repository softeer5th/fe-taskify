import { parseToDoc } from "../utils/parseToDoc.js";

export const cardForm = (sectionType) => {
  const cardFormHTML = /*html*/ `
    <li class="${sectionType}-form-card card display-none">
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
  return parseToDoc(cardFormHTML);
};
