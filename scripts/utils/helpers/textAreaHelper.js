/**
 * 텍스트 영역 자동 높이 조절 함수
 * @param {HTMLTextAreaElement} textArea 텍스트 영역 요소
 */
const autoResize = (textArea) => {
  textArea.style.height = 'auto'; // 높이를 초기화하여 스크롤 높이를 정확히 계산
  textArea.style.height = `${textArea.scrollHeight}px`; // 내용 크기에 따라 높이 설정
};

/**
 * 텍스트 영역 500자 제한 함수
 * @param {HTMLTextAreaElement} textArea 텍스트 영역 요소
 */
const limitTextLength = (textArea) => {
  if (textArea.value.length > 500) {
    textArea.value = textArea.value.substring(0, 500); // 500자 초과 시 잘라내기
  }
};

export { autoResize, limitTextLength };
