import Button from '../../components/button.js';
import IconButton from '../../components/iconButton.js';

/**
 * 카드 모드에 따라 그림자 생성
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

/**
 * 카드 모드에 따라 버튼 추가
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
    Button({
      type: 'cancle',
      onClick: () => console.log('cancle button clicked'),
    })
  );

  if (isEditing) {
    buttonsArea.appendChild(
      Button({
        type: 'edit',
        isDisabled,
        onClick: () => console.log('edit button clicked'),
      })
    );
  } else {
    buttonsArea.appendChild(
      Button({
        type: 'add',
        isDisabled,
        onClick: () => console.log('add button clicked'),
      })
    );
  }
};

/**
 * 카드 모드에 아이콘 버튼 유무 설정
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

export { setCardShadow, setCardButtons, setCardIconButtons };
