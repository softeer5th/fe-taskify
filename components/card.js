import { parseToDoc } from "../utils/parseToDoc.js";
export const card = (id, title = "", content = "") => {
  const cardHTML = /*html*/ `
      <li class="card" id="${id}">
          <div class="card-contents-icons-box">
          <div class="card-texts">
              <input class="title text-strong" value="${title}" aria-placeholder="제목" />
              <input class="content text-default" value="${content}" aria-placeholder="내용"/>
          </div>
          <div class="card-icons">
              <!-- x 아이콘 -->
              <div class="card-delete-icon">
              <img  class="card-delete-icon" src="./assets/icons/delete.svg" alt="" />
              </div>
              <!-- 편집 아이콘 -->
              <div class="card-edit-icon">
              <img class="card-edit-icon" src="./assets/icons/edit.svg" alt="" />
              </div>
          </div>
          </div>
          <!-- card-btn-box 은 + 버튼 누르면 보이는 영역 -->
          <div class="name-of-device text-weak">author by web</div>
          <div class="card-btn-box display-none">
          <button class="cancel-btn">취소</button>
          <button class="save-btn add-btn">
              저장
          </button>
      </div>
      </li>
      `;
  return parseToDoc(cardHTML);
};
