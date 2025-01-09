import Button from '../../components/button.js';

/**
 * 카드 모드에 따라 그림자 생성
 * @param {HTMLElement} cardElement
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 */
const addCardShadow = (cardElement, mode) => {
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
const addCardButtons = (cardElement, mode, isEditing, isDisabled) => {
  if (mode !== 'add') {
    return;
  }

  const buttonsArea = cardElement.querySelector('#buttons-area');
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

export { addCardShadow, addCardButtons };
