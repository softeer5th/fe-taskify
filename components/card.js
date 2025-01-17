import { DELETE_ICON } from "../assets/icons/deleteIcon.js";
import { parseToDoc } from "../utils/parseToDoc.js";

export const card = (id, title = "", content = "") => {
  const cardHTML = /*html*/ `
      <div class="card" id="${id}" draggable="true">
          <div class="card-contents-icons-box">
          <div class="card-texts">
              <textarea class="title text-strong" aria-placeholder="제목">${title}</textarea>
              <textarea class="content text-default" aria-placeholder="내용">${content}</textarea>
          </div>
          <div class="card-icons">
              <!-- x 아이콘 -->
              <div class="card-delete-icon">
              ${DELETE_ICON}
              </div>
              <!-- 편집 아이콘 -->
              <div class="card-edit-icon">
              <img draggable="false" class="card-edit-icon" src="./assets/icons/edit.svg" alt="" />
              </div>
          </div>
          </div>
          <!-- card-btn-box 은 + 버튼 누르면 보이는 영역 -->
          <div class="name-of-device text-weak">author by web</div>
          <div class="card-btn-box display-none">
          <button class="edit-cancel-btn cancel-btn">취소</button>
          <button class="save-btn">
              저장
          </button>
      </div>
      </div>
      `;

  return parseToDoc(cardHTML);
};
