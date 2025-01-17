export const calcBeforeTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (day > 0) {
    return `${day}일 전`;
  }

  if (hour > 0) {
    return `${hour}시간 전`;
  }

  if (min > 0) {
    return `${min}분 전`;
  }

  return "방금 전";
};
