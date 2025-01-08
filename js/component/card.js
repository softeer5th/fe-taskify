export const cardComponent = (title, content) => {
  return /*html*/ `
      <li class="card">
          <div class="card-contents-icons-box">
          <div class="card-texts">
              <input class="title text-strong" value="${title}" aria-placeholder="제목" />
              <input class="content text-default" value="${content}" aria-placeholder="내용"/>
          </div>
          <div class="card-icons">
              <!-- x 아이콘 -->
              <div class="card-delete-icon">
              <img src="./assets/icons/delete.svg" alt="" />
              </div>
              <!-- 편집 아이콘 -->
              <div class="card-edit-icon">
              <img src="./assets/icons/edit.svg" alt="" />
              </div>
          </div>
          </div>
          <!-- card-btn-box 은 + 버튼 누르면 보이는 영역 -->
          <div class="name-of-device text-weak">author by web</div>
         
      </li>
      `;
};
