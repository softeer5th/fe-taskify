/**
 * 버튼 컴포넌트
 * @param {number} id
 * @param {'add' | 'cancle' | 'delete' | 'edit'} type - 버튼 타입
 * @param {function} [onClick] - 클릭 이벤트 핸들러
 * @returns {DocumentFragment} - 버튼 요소를 포함하는 DocumentFragment
 */
const Button = (type, onClick ) => {
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
      buttonElement.id = 'blue';
      break;
    case 'edit':
      buttonElement.textContent = '수정';
      buttonElement.classList.add('surface-brand', 'text-white-default');
      buttonElement.id = 'blue';
      break;
    case 'delete':
      buttonElement.textContent = '삭제';
      buttonElement.classList.add('surface-danger', 'text-white-default');
      break;
    default:
      console.warn(`Unknown button type: ${type}`);
  }

  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }

  return button;
};

export default Button;
