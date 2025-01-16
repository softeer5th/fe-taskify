function calculateTimePassed(timeStamp) {
  const seconds = timeStamp;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}년 전`;
  if (months > 0) return `${months}달 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds}초 전`;
}

export default function historyItem({ history, user }) {
  const historyItemElement = document.createElement("li");
  historyItemElement.classList.add("history__item");

  const historyItemUserThumbnail = document.createElement("img");
  historyItemUserThumbnail.src = user.thumbnailUrl;
  historyItemUserThumbnail.alt = user.name;
  historyItemUserThumbnail.classList.add("history__item--thumbnail");

  const historyItemContent = document.createElement("div");
  historyItemContent.classList.add("history__item--content");

  const historyItemUser = document.createElement("span");
  historyItemUser.textContent = user.name;
  historyItemUser.classList.add("history__item--content-username");

  const historyItemActionLog = document.createElement("span");
  historyItemActionLog.innerHTML = history.actionLog;
  historyItemActionLog.classList.add("history__item--content-description");

  const historyItemTimeStamp = document.createElement("span");
  const timeStamp = Math.floor((new Date() - history.actionTime) / 1000);
  historyItemTimeStamp.textContent = `${calculateTimePassed(timeStamp)}`;
  historyItemTimeStamp.classList.add("history__item--content-timestamp");

  historyItemContent.appendChild(historyItemUser);
  historyItemContent.appendChild(historyItemActionLog);
  historyItemContent.appendChild(historyItemTimeStamp);

  historyItemElement.appendChild(historyItemUserThumbnail);
  historyItemElement.appendChild(historyItemContent);
  return historyItemElement;
}
