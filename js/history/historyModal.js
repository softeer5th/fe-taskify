export const showHistoryModal = () => {
  const modal = document.querySelector(".history-modal");
  if (!modal) {
    const newTask = document.createElement("div");
    newTask.className = "history-modal";
    newTask.innerHTML = `
    <div class = "modal-body">
        
    </div>
  `;
    document.body.appendChild(newTask);
    // 애니메이션이 시작되도록 약간의 지연 후 클래스 추가
    setTimeout(() => {
      newTask.classList.add("show");
    }, 10);
  } else {
    modal.classList.remove("show");
    modal.classList.add("close");
  }
};
