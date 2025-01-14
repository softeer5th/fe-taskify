/**
 * 버튼 컴포넌트
 * @param {'add' | 'cancel' | 'delete' | 'edit'} type - 버튼 타입
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @returns {DocumentFragment} - 버튼 요소를 포함하는 DocumentFragment
 */
const Button = (type, onClick) => {
  /**
   * @type {DocumentFragment}
   */
  const button = document
    .getElementById('button-template')
    .content.cloneNode(true);

  const buttonElement = button.querySelector('button');

  switch (type) {
    case 'cancel':
      buttonElement.textContent = '취소';
      buttonElement.classList.add('surface-alt', 'text-default');
      break;
    case 'add':
    case 'edit':
      buttonElement.id = type === 'add' ? 'add-button' : 'edit-button';
      buttonElement.textContent = type === 'add' ? '등록' : '수정';
      buttonElement.classList.add('surface-brand', 'text-white-default');
      break;
    case 'delete':
      buttonElement.textContent = '삭제';
      buttonElement.classList.add('surface-danger', 'text-white-default');
      break;
    default:
      console.warn(`Unknown button type: ${type}`);
  }

  buttonElement.addEventListener('click', onClick);

  return button;
};

export default Button;
