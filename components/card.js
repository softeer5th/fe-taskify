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
              <svg
                class="card-delete-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                class="card-delete-icon"
                d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
                fill="#A0A3BD" />
                </svg>
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
          <button class="edit-cancel-btn cancel-btn">취소</button>
          <button class="save-btn">
              저장
          </button>
      </div>
      </li>
      `;
  return parseToDoc(cardHTML);
};
