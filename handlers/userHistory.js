import createModal from "../components/Modal/createModal.js";

export const handleClickDeleteHistory = () => {
  createModal({
    content: "모든 사용자 활동 기록을 삭제할까요?",
    type: "history",
  });
};
