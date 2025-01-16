import { clearHistory } from "./historyManager.js";
export const showWarningModal = (message, type) => {
  const modal = document.createElement("div");
  modal.className = "warning-modal";
  modal.innerHTML = `
      <div class="warning-modal-content">
   
        <div class="warning-modal-body">
          <p>${message}</p>
        </div>
        <div class="warning-modal-footer">

          <button class="warn-btn warning-modal-confirm-btn">취소</button>
          <button class="warn-btn warning-modal-cancel-btn ${type}">확인</button>
        </div>
      </div>
    `;
  document.body.appendChild(modal);
};
