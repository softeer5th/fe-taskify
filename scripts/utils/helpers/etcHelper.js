/**
 * 모달 초기화 함수
 * @param {string} message
 * @returns {HTMLElement}
 */
const initModal = (message) => {
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'flex';
  const modal = overlay.querySelector('.modal');
  modal.querySelector('h2').textContent = message;
  return overlay;
};

/**
 * 로그를 히스토리에 추가
 * @param {object} params - 함수의 매개변수 객체
 * @param {'add', 'delete', 'edit', 'move'} params.actionType - 액션 타입
 * @param {string} params.cardTitle - 카드 제목
 * @param {string} params.fromColumnTitle - 이동 전 컬럼 제목
 * @param {string} params.toColumnTitle - 이동 후 컬럼 제목
 * @param {Date} params.loggedTime - 로그 시간
 */
const addLogToHistory = ({
  actionType,
  cardTitle,
  fromColumnTitle,
  toColumnTitle,
  loggedTime,
}) => {
  const history = document.getElementById('history');
  const newLogElement = document
    .getElementById('log-template')
    .content.cloneNode(true);

  const logTexts = generateLogText({
    actionType,
    cardTitle,
    fromColumnTitle,
    toColumnTitle,
  });

  // 생성된 텍스트를 추가
  newLogElement.querySelector('h3').after(...logTexts);

  // 시간 차이 계산 후 1시간 단위 면 ~시간 전, 분 단위면 ~분 전
  const nowTime = new Date();
  const timeDiff = nowTime - loggedTime;
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  newLogElement.querySelector('#logged-time').textContent =
    hoursDiff > 0
      ? `${hoursDiff}시간 전`
      : minutesDiff < 1
      ? '방금 전'
      : `${minutesDiff}분 전`;
  history.querySelector('#gap-div').after(newLogElement);
};

const generateLogText = ({
  actionType,
  cardTitle,
  fromColumnTitle,
  toColumnTitle,
}) => {
  const logTotal = [cardTitle, fromColumnTitle, toColumnTitle, cardTitle].map(
    () => document.getElementById('log-bold').content.cloneNode(true)
  );

  logTotal[0].textContent = cardTitle;
  logTotal[1].textContent = fromColumnTitle;
  if (toColumnTitle) logTotal[2].textContent = toColumnTitle;
  switch (actionType) {
    case 'add':
      logTotal[3].textContent = '등록';
      break;
    case 'delete':
      logTotal[3].textContent = '삭제';
      break;
    case 'edit':
      logTotal[3].textContent = '변경';
      break;
    case 'move':
      logTotal[3].textContent = '이동';
  }

  return logTotal;
};

export { initModal, addLogToHistory };
