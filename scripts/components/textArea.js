import {
  autoResize,
  limitTextLength,
} from '../utils/helpers/textAreaHelper.js';

/**
 * 텍스트 영역 컴포넌트
 * @param {Object} props
 * @param {HTMLElement} props.cardElement - 카드 요소
 * @param {string} props.title - 텍스트 영역 제목
 * @param {string} props.body - 텍스트 영역 값
 * @param {boolean} props.isEditing - 텍스트 영역 활성화 여부
 * @param {function} props.setDisabled - 텍스트 영역 값 변경 시 호출되는 함수
 * @returns {HTMLElement} - 텍스트 영역 요소를 포함하는 element
 */
const TextArea = ({ cardElement, title, body, isEditing, setDisabled }) => {
  /**
   * @type {HTMLTextAreaElement}
   */
  const textAreaElement =
    isEditing === true
      ? document
          .getElementById('text-form-template')
          .content.cloneNode(true)
          .querySelector('form')
      : document
          .getElementById('freezed-text-template')
          .content.cloneNode(true)
          .querySelector('div');

  if (isEditing === true) {
    const _input = textAreaElement.querySelector('input');
    _input.value = title;
    const _textArea = textAreaElement.querySelector('textarea');
    _textArea.value = body;
    _input.addEventListener('input', () => {
      if (_input.value.trim() === '' || _textArea.value.trim() === '') {
        cardElement.querySelector('#blue').disabled = true;
      } else {
        cardElement.querySelector('#blue').disabled = false;
      }
    });
    _textArea.addEventListener('input', () => {
      autoResize(_textArea);
      limitTextLength(_textArea);
      if (_textArea.value.trim() === '' || _input.value.trim() === '') {
        cardElement.querySelector('#blue').disabled = true;
      } else {
        cardElement.querySelector('#blue').disabled = false;
      }
    }); // 입력 시 이벤트 리스너 추가
  } else {
    textAreaElement.querySelector('h3').textContent = title;
    textAreaElement.querySelector('p').textContent = body;
  }
  return textAreaElement;
};

export default TextArea;
