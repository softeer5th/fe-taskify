// 버튼과 다이얼로그 요소 가져오기
const openHistoryButton = document.getElementById('history-button');
const dialog = document.getElementById('history-dialog');

// 버튼 클릭 이벤트 등록
openHistoryButton.addEventListener('click', (event) => {
    // 다이얼로그 표시
    dialog.classList.toggle('visible'); // 클릭 시 토글

    // 버튼의 위치 정보 가져오기
    const buttonRect = openHistoryButton.getBoundingClientRect();

    // 다이얼로그 위치 계산 (버튼 아래에 표시)
    const dialogWidth = dialog.offsetWidth;
    const dialogX = buttonRect.right - dialogWidth; // 버튼의 오른쪽 위치
    const dialogY = buttonRect.bottom + window.scrollY; // 버튼의 하단 위치 + 스크롤 값

    // 다이얼로그 위치 설정
    dialog.style.left = `${dialogX}px`;
    dialog.style.top = `${dialogY}px`;
});


const closeHistoryButton = document.querySelector('.close-history');

closeHistoryButton.addEventListener('click', (event)=> {
    // 다이얼로그 표시
    dialog.classList.toggle('visible'); // 클릭 시 토글
});