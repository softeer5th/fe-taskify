/**
 * 버튼 컴포넌트
 * @param {Object} options - 옵션 객체
 * @param {'add' | 'cancle' | 'delete' | 'edit'} options.type - 버튼 타입
 * @param {boolean} [options.isDisabled=false] - 버튼 활성화 여부 (기본값: false)
 * @param {function} [options.onClick] - 클릭 이벤트 핸들러
 * @returns {DocumentFragment} - 버튼 요소를 포함하는 DocumentFragment
 */
const Button = ({ type, isDisabled = false, onClick }) => {
  /**
   * @type {DocumentFragment}
   */
  const button = document
    .getElementById('button-template')
    .content.cloneNode(true);

  const buttonElement = button.querySelector('button');

  switch (type) {
    case 'cancle':
      buttonElement.textContent = '취소';
      buttonElement.classList.add('surface-alt', 'text-default');
      break;
    case 'add':
      buttonElement.textContent = '등록';
      buttonElement.classList.add('surface-brand', 'text-white-default');
      break;
    case 'edit':
      buttonElement.textContent = '수정';
      buttonElement.classList.add('surface-brand', 'text-white-default');
      break;
    case 'delete':
      buttonElement.textContent = '삭제';
      buttonElement.classList.add('surface-danger', 'text-white-default');
      break;
    default:
      console.warn(`Unknown button type: ${type}`);
  }

  buttonElement.disabled = isDisabled;

  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }

  return button;
};

export default Button;
