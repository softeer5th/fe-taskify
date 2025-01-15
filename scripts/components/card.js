import { draggedCardIdState } from '../main.js';
import {
  initCardTextArea,
  initCardIconButtons,
  initCardButtons,
  setCardShadow,
  toggleDisplay,
} from '../utils/helpers/cardHelper.js';
import createState from '../utils/helpers/stateHelper.js';

/**
 * @typedef {Object} Card
 * @property {number} id - 카드 ID
 * @property {string} title - 카드 제목
 * @property {string} body - 카드 내용
 * @property {string} createdDate - 카드 생성일
 */

/**
 * 카드 컴포넌트
 * @param {'default' | 'add' | 'drag' | 'place' | 'edit'} mode - 카드 모드
 * @param {Card} cardData - 카드 데이터
 * @param {function} addCard - 카드 추가 함수
 * @param {function} deleteCard - 카드 삭제 함수
 * @param {function} editCard - 카드 수정 함수
 * @returns {HTMLElement} - 카드 요소를 포함하는 HTMLElement
 */
const Card = (mode = 'default', cardData, addCard, deleteCard, editCard) => {
  /**
   * @type {HTMLElement}
   */
  const cardElement = document
    .getElementById('card-template')
    .content.cloneNode(true)
    .querySelector('li');

  const cardState = createState(cardData);
  const cardMode = createState(mode);

  cardState.subscribe(() => {
    if (cardMode.getState() === 'add') {
      addCard(cardState.getState());
      cardElement.id = cardState.getState().id;
    } else editCard(cardState.getState());
    cardMode.setState('default');
  });

  cardMode.subscribe(() => {
    updateCardDisplay(cardElement, cardState.getState(), cardMode.getState());
  });

  cardElement.id = cardState.getState().id;
  initCardTextArea(cardElement, cardState.getState());
  initCardIconButtons(
    cardElement,
    () => {
      cardElement.remove();
      deleteCard(cardState.getState().id);
    },
    () => {
      cardMode.setState('edit');
    }
  );
  initCardButtons(cardElement, [
    {
      name: 'cancel',
      handler: () => {
        if (
          cardState.getState().title === null &&
          cardState.getState().body === null
        ) {
          cardElement.parentElement.querySelector('#add-card').disabled = false;
          cardElement.remove();
        } else {
          cardMode.setState('default');
        }
      },
    },
    {
      name: 'add',
      handler: () => {
        applyCardChanges(cardElement, cardState);
        cardElement.parentElement.querySelector('#add-card').disabled = false;
      },
      // TODO: 바뀐 데이터를 상위 요소에게 알려줘야 함
    },
    {
      name: 'edit',
      handler: () => {
        applyCardChanges(cardElement, cardState);
      },
      // TODO: 바뀐 데이터를 상위 요소에게 알려줘야 함
    },
  ]);

  updateCardDisplay(cardElement, cardState.getState(), cardMode.getState());

  cardElement.addEventListener('dragstart', (event) => {
    cardMode.setState('place');
    draggedCardIdState.setState(cardElement.id);
    event.dataTransfer.effectAllowed = 'move';
  });

  cardElement.addEventListener('dragend', (event) => {
    cardMode.setState('default');
    // 카드의 드래그가 끝나면, 해당 카드 원래 위치해있던 컬럼에서 deleteCard를 호출하여 삭제
    deleteCard(cardState.getState().id);
  });

  return cardElement;
};

/**
 *
 * @param {HTMLElement} cardElement
 * @param {Card} cardState
 * @param {'default' | 'add' | 'drag' | 'place' | 'edit'} cardMode - 카드 모드
 */
const updateCardDisplay = (cardElement, cardState, cardMode) => {
  toggleDisplay(
    cardElement.querySelector('#freezed-text'),
    cardMode !== 'add' && cardMode !== 'edit'
  );
  toggleDisplay(
    cardElement.querySelector('#icon-area'),
    cardMode !== 'add' && cardMode !== 'edit'
  );
  toggleDisplay(
    cardElement.querySelector('#text-form'),
    cardMode === 'add' || cardMode === 'edit'
  );
  toggleDisplay(
    cardElement.querySelector('#button-area'),
    cardMode === 'add' || cardMode === 'edit'
  );

  toggleDisplay(cardElement.querySelector('#add-button'), cardMode !== 'edit');
  toggleDisplay(cardElement.querySelector('#edit-button'), cardMode === 'edit');

  cardElement
    .querySelectorAll('#button-area button')
    .forEach((button, index) => {
      if (index !== 0) {
        button.disabled = cardState.title === null || cardState.body === null;
      }
    });

  const _h3 = cardElement.querySelector('h3');
  const _p = cardElement.querySelector('p');
  const _input = cardElement.querySelector('form input');
  const _textArea = cardElement.querySelector('form textarea');

  _input.value = _h3.textContent = cardState.title;
  _textArea.value = _p.textContent = cardState.body;

  setCardShadow(cardElement, cardMode);

  if (cardMode == 'place') {
    cardElement.style.opacity = '0.3';
  } else {
    cardElement.style.opacity = '1';
  }
};

const applyCardChanges = (cardElement, cardState) => {
  cardState.setState((prev) => ({
    id: prev.id ?? Date.now() + Math.random(),
    title: cardElement.querySelector('input').value,
    body: cardElement.querySelector('textarea').value,
    createdDate: prev.createdDate ?? new Date().toISOString(),
  }));
};

export default Card;
