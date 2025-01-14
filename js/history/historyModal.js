export const showHistoryModal = () => {
  const modal = document.querySelector(".history-modal");
  console.log(modal);
  if (!modal) {
    const newTask = document.createElement("div");
    newTask.className = "history-modal";
    newTask.innerHTML = `
    <div class ="history-modal-header">
      <div class =" history-modal-title display-bold16">
        사용자 활동 기록
      </div>
      <button class = "history-modal-close-btn" >
        <img src = "../assets/icon/closed_blue.svg" alt = "x">
        <div class"history-modal-close-text display-bold14">닫기</div>
      </button>
    </div>

    <div class ="history-modal-main">
      <div class = "history">

        <div class = "history-profile-icon">
          <img src="../assets/icon/profile-icon.png" alt="profile" style="border-radius:100px">
        </div>

        <div class ="history-body">
          <div class = "history-username display-Medium14">
            멋진삼
          </div>
          <div class = "history-content display-Medium14 ">
            블로그에 포스팅할 것을(를) 하고있는 일에서 해야할 일으로 이동하였습니다.
          </div>
          <div class = "history-timestmamp display-Medium12">
            3분전
          </div>
        </div>

      </div>
    </div>
      
    <div class ="history-modal-footer display-bold14">
      기록 전체 삭제
    </div>
  `;
    document.body.appendChild(newTask);
    // 애니메이션이 시작되도록 약간의 지연 후 클래스 추가
    setTimeout(() => {
      newTask.classList.add("show");
    }, 10);
  } else {
    if (modal.classList.contains("close")) {
      // close 클래스가 있으면 제거하고 show 클래스 추가
      modal.classList.remove("close");
      modal.classList.add("show");
    } else {
      // show 클래스가 있으면 제거하고 close 클래스 추가
      modal.classList.remove("show");
      modal.classList.add("close");
    }
  }
};
