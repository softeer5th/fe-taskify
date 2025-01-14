export const formatHistoryDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);

  switch (true) {
    case minutes < 1:
      return "방금 전";
    case minutes < 60:
      return `${minutes}분 전`;
    case hours < 24:
      return `${hours}시간 전`;
    default:
      const days = Math.floor(hours / 24);
      return `${days}일 전`;
  }
};
