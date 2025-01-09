/**
 * 버튼 컴포넌트
 * @param {'add' | 'cancle' | 'delete' | 'edit'} type - 버튼 타입
 * @param {boolean} isDisabled - 버튼 활성화 여부
 * @returns DocumentFragment
 */
const Button = (type, isDisabled) => {
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

  if (isDisabled) {
    buttonElement.disabled = true;
  }

  return button;
};

export default Button;