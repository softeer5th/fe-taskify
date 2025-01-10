import Button from '../../components/button.js';
import IconButton from '../../components/iconButton.js';
import TextArea from '../../components/textArea.js';

/**
 * @typedef {Object} Card
 * @property {number} id - 카드 ID
 * @property {string} title - 카드 제목
 * @property {string} body - 카드 내용
 * @property {string} createdDate - 카드 생성일
 */

/**
 * 카드 모드에 따라 텍스트영역 세팅
 * @param {HTMLElement} cardElement
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 * @param {Card} cardData
 * @param {function} setDisabled
 */
const setCardTextArea = (cardElement, mode, cardData, setDisabled) => {
  const textArea = cardElement.querySelector('#text-area');

  textArea.appendChild(
    TextArea({
      cardElement: cardElement,
      title: cardData.title,
      body: cardData.body,
      isEditing: mode === 'add',
      setDisabled,
    })
  );
};

/**
 * 카드 모드에 따라 아이콘 버튼 세팅
 * @param {HTMLElement} cardElement
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 */
const setCardIconButtons = (cardElement, mode) => {
  const iconsArea = cardElement.querySelector('#icon-area');

  if (mode === 'add') {
    // 이 친구는 레이아웃에 기본적으로 존재하는 영역이므로 display: none 처리
    iconsArea.style.display = 'none';
    return;
  }

  iconsArea.appendChild(
    IconButton({
      type: 'delete',
      onClick: () => console.log('delete button clicked'),
    })
  );
  iconsArea.appendChild(
    IconButton({
      type: 'edit',
      onClick: () => console.log('edit button clicked'),
    })
  );
};

/**
 * 카드 모드에 따라 버튼 세팅
 * @param {HTMLElement} cardElement
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 * @param {boolean} isEditing
 * @param {boolean} isDisabled
 */
const setCardButtons = (cardElement, mode, isEditing, isDisabled) => {
  const buttonsArea = cardElement.querySelector('#button-area');

  if (mode !== 'add') {
    // 이 친구는 레이아웃에 기본적으로 존재하는 영역이므로 display: none 처리
    buttonsArea.style.display = 'none';
    return;
  }

  buttonsArea.appendChild(
    Button('cancle', () => console.log('cancle button clicked'))
  );

  if (isEditing) {
    buttonsArea.appendChild(
      Button('edit', () => console.log('edit button clicked'))
    );
  } else {
    buttonsArea.appendChild(
      Button('add', () => console.log('add button clicked'))
    );
  }
};

/**
 * 카드 모드에 따라 그림자 세팅
 * @param {HTMLElement} cardElement
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 */
const setCardShadow = (cardElement, mode) => {
  if (mode === 'drag') {
    cardElement.style.boxShadow = 'var(--shadow-floating)';
  } else {
    cardElement.style.boxShadow = 'var(--shadow-normal)';
  }
};

export { setCardTextArea, setCardIconButtons, setCardButtons, setCardShadow };
