import icons from "../../asset/icon.js";

import historyItem from "../component/historyItem.js";

export default function HistoryView({ history, user, onHistoryCloseButtonClicked, onHistoryDeleteButtonClicked }) {
  const historyElement = document.createElement("div");
  historyElement.classList.add("history");

  const historyTitle = document.createElement("div");
  historyTitle.classList.add("history__title");

  const historyTitleText = document.createElement("h2");
  historyTitleText.textContent = "사용자 활동 기록";
  historyTitleText.classList.add("history__title-text");

  const historyOffButton = document.createElement("button");
  historyOffButton.classList.add("history__title-button");
  historyOffButton.addEventListener("click", onHistoryCloseButtonClicked);

  const historyOffButtonIcon = document.createElement("div");
  historyOffButtonIcon.appendChild(icons.closed());
  historyOffButtonIcon.classList.add("history__title-button-icon");

  const historyOffButtonText = document.createElement("span");
  historyOffButtonText.textContent = "닫기";
  historyOffButtonText.classList.add("history__title-button-text");

  historyOffButton.appendChild(historyOffButtonIcon);
  historyOffButton.appendChild(historyOffButtonText);

  historyTitle.appendChild(historyTitleText);
  historyTitle.appendChild(historyOffButton);

  const historyList = document.createElement("ul");
  historyList.classList.add("history__list");

  if (history.length === 0) {
    historyList.classList.add("history__list--empty");

    const historyEmpty = document.createElement("span");
    historyEmpty.textContent = "사용자 활동 기록이 없습니다.";

    historyList.appendChild(historyEmpty);
  } else {
    history.forEach((historyItemData) => {
      const historyItemElement = historyItem({ history: historyItemData, user });
      historyList.appendChild(historyItemElement);
    });
  }

  const historyDelete = document.createElement("div");
  historyDelete.classList.add("history__delete");

  const historyDeleteButton = document.createElement("button");
  historyDeleteButton.addEventListener("click", onHistoryDeleteButtonClicked);
  historyDeleteButton.textContent = "기록 전체 삭제";

  historyDelete.appendChild(historyDeleteButton);

  historyElement.appendChild(historyTitle);
  historyElement.appendChild(historyList);
  historyElement.appendChild(historyDelete);

  return historyElement;
}
