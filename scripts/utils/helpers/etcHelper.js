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
 * @param {'add' | 'delete' | 'edit' | 'move'} params.actionType - 액션 타입
 * @param {string} params.cardTitle - 카드 제목
 * @param {string} params.fromColumnName - 이동 전 컬럼 제목
 * @param {string} params.toColumnName - 이동 후 컬럼 제목
 * @param {Date} params.loggedTime - 로그 시간
 */
const addLogToHistory = ({
  actionType,
  cardTitle,
  fromColumnName,
  toColumnName,
  loggedTime,
}) => {
  const history = document.getElementById('history');
  const newLogElement = document
    .getElementById('log-template')
    .content.cloneNode(true);

  console.log(actionType, cardTitle, fromColumnName, toColumnName, loggedTime);

  const logTexts = generateLogText({
    actionType,
    cardTitle,
    fromColumnName,
    toColumnName,
  });

  // 생성된 텍스트를 추가
  newLogElement.querySelector('#log').append(...logTexts);

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
  fromColumnName,
  toColumnName,
}) => {
  const logTotal = [];

  const createSpanElement = (text, isbold) => {
    const clone = document
      .getElementById(isbold ? 'log-bold' : 'log-default')
      .content.cloneNode(true);
    const span = clone.querySelector('span');
    span.textContent = text;
    return span;
  };

  logTotal.push(createSpanElement(cardTitle, true));
  logTotal.push(createSpanElement('을(를) ', false));
  logTotal.push(createSpanElement(fromColumnName, true));
  logTotal.push(createSpanElement('에서 ', false));
  if (toColumnName) {
    logTotal.push(createSpanElement(toColumnName, true));
    logTotal.push(createSpanElement('(으)로 ', false));
  }
  switch (actionType) {
    case 'add':
      logTotal.push(createSpanElement('등록', true));
      break;
    case 'delete':
      logTotal.push(createSpanElement('삭제', true));
      break;
    case 'edit':
      logTotal.push(createSpanElement('변경', true));
      break;
    case 'move':
      logTotal.push(createSpanElement('이동', true));
  }
  logTotal.push(createSpanElement('하였습니다.', false));

  logTotal.forEach((e) => console.log(typeof e));
  return logTotal;
};

export { initModal, addLogToHistory };
