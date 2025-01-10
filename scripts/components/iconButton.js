/**
 * 아이콘 버튼 컴포넌트
 * @param {Object} options - 옵션 객체
 * @param {'edit' | 'delete'} options.type - 버튼 타입
 * @param {Function} [options.onClick] - 클릭 이벤트 핸들러
 * @returns {DocumentFragment} - 아이콘 버튼 요소를 포함하는 DocumentFragment
 */
const IconButton = ({type, onClick}) => {
  const icon = document.getElementById('icon-template').content.cloneNode(true);

  /**
   * @type {HTMLElement}
   */
  const iconImage = icon.querySelector('img');

  switch (type) {
    case 'edit':
      iconImage.src = './assets/icons/edit.svg';
      break;
    case 'delete':
      iconImage.src = './assets/icons/closed.svg';
      break;
    default:
      console.warn(`Unknown icon type: ${type}`);
  }

  if (onClick) {
    icon.querySelector('button').addEventListener('click', onClick);
  }

  return icon;
};

export default IconButton;
