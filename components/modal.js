import { parseToDoc } from "../utils/parseToDoc.js";

export const modal = (msg) => {
  const modalHTML = /*html*/ `
  <div class="display-none modal-overlay">
  <div class="modal-container">
    <div class="modal-msg">${msg}</div>
    <div class="modal-btn">
      <button class="modal-cancel-btn">취소</button>
      <button class="modal-delete-btn">삭제</button>
    </div>
  </div>
  </div>
    `;
  return parseToDoc(modalHTML);
};
