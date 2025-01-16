import { historyObserver } from "./historyObserver.js";
import { getHistory } from "../../utils/storage/historyManager.js";

export const showHistoryModal = () => {
  const modal = document.querySelector(".history-modal");
  if (!modal) {
    const newTask = document.createElement("div");
    newTask.className = "history-modal";
    newTask.innerHTML = `
      <div class="history-modal-header">
        <div class="history-modal-title display-bold16">사용자 활동 기록</div>
        <button class="history-modal-close-btn">
          <img src="../assets/icon/closed_blue.svg" alt="x">
          <div class="history-modal-close-text display-bold14">닫기</div>
        </button>
      </div>
      <div class="history-modal-main">
        <div class="history-list"></div>
      </div>
      <div class="history-modal-footer display-bold14">기록 전체 삭제</div>
    `;
    document.body.appendChild(newTask);
    setTimeout(() => {
      newTask.classList.add("show");
    }, 10);
  } else {
    if (modal.classList.contains("close")) {
      modal.classList.remove("close");
      modal.classList.add("show");
    } else {
      modal.classList.remove("show");
      modal.classList.add("close");
    }
  }
  updateHistoryList(getHistory());
};

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const timeDifference = now - new Date(timestamp);
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutes < 60) {
    return `${minutes}분전`;
  } else {
    return `${hours}시간전`;
  }
};

const updateHistoryList = (history) => {
  const historyList = document.querySelector(".history-list");
  if (!history) return;
  history.sort((a, b) => b.timestamp - a.timestamp);

  if (historyList) {
    historyList.innerHTML = history
      .map((item) => {
        const column = document
          .querySelector(`.column[data-column-key="${item.column}"]`)
          .querySelector(".column-title").innerText;
        let columnTogo = "";
        if (item.columnTogo !== "empty") {
          columnTogo = document
            .querySelector(`.column[data-column-key="${item.columnTogo}"]`)
            .querySelector(".column-title").innerText;
        }

        let actionText = "";
        switch (item.functionType) {
          case "ADD":
            actionText = `<strong>${item.title}</strong> 을(를) <strong>${column}</strong> 에 <strong>추가</strong> 하였습니다.`; //하고 있던거 컬럼 제목 추가 및 강조 텍스트
            break;
          case "DELETE":
            actionText = `<strong>${item.title}</strong> 을(를) <strong>${column}</strong> 에서 <strong>삭제</strong> 하였습니다.`;
            break;
          case "EDIT":
            actionText = `<storng>${item.title}</strong> 을(를) <strong>수정</strong> 하였습니다.`;
            break;
          case "MOVE":
            actionText = `<strong>${item.title}</strong> 을(를) <strong>${column}</strong>에서 <strong>${columnTogo}</strong>로 <strong>이동</strong> 하였습니다.`;
            break;
        }

        return `
        <div class="history">
          <div class="history-profile-icon">
            <img src="../assets/icon/profile-icon.png" alt="profile" style="border-radius:100px">
          </div>
          <div class="history-body">
            <div class="history-username display-Medium14">멋진삼</div>
            <div class="history-content display-Medium14">
              ${actionText}
            </div>
            <div class="history-timestamp display-Medium12">${getRelativeTime(
              item.timestamp
            )}</div>
          </div>
        </div>
      `;
      })
      .join("");
  }
};

historyObserver.subscribe(updateHistoryList);
