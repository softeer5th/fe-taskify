import { draggedCardState } from '../main.js';
import {
  initCardTextArea,
  initCardIconButtons,
  initCardButtons,
  setCardShadow,
  toggleDisplay,
} from '../utils/helpers/cardHelper.js';
import createState from '../store/models/stateHelper.js';
import { initModal } from '../utils/helpers/etcHelper.js';

/**
 * @typedef {Object} Card
 * @property {number} id - 카드 ID
 * @property {string} title - 카드 제목
 * @property {string} body - 카드 내용
 * @property {string} createdDate - 카드 생성일
 */

/**
 * 카드 컴포넌트
 * @param {object} props
 * @param {'default' | 'add' | 'drag' | 'place' | 'edit'} props.mode - 카드 모드. edit 모드는 기획서엔 없으나 자체적으로 추가함
 * @param {Card} props.cardData - 카드 데이터
 * @param {function} props.addCard - 카드 추가 함수
 * @param {function} props.deleteCard - 카드 삭제 함수
 * @param {function} props.editCard - 카드 수정 함수
 * @param {function} props.initCardsInColumn - 컬럼에 있는 카드들 초기화하는 함수
 * @returns {HTMLElement} - 카드 요소를 포함하는 HTMLElement
 */
const Card = ({
  mode = 'default',
  cardData,
  addCard,
  deleteCard,
  editCard,
  initCardsInColumn,
}) => {
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
      const overlay = initModal('선택한 카드를 삭제할까요?');
      initCardButtons(overlay.querySelector('.modal'), [
        {
          name: 'cancel',
          handler: () => {
            overlay.style.display = 'none';
          },
        },
        {
          name: 'delete',
          handler: () => {
            overlay.style.display = 'none';
            cardElement.remove();
            deleteCard(cardState.getState(), true);
          },
        },
      ]);
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
    draggedCardState.setState({
      cardState: cardState.getState(),
      fromColumnName: cardElement.parentElement.querySelector('h2').textContent,
      fromColumnInit: () => {
        deleteCard(cardState.getState(), false);
        initCardsInColumn();
      },
    }),
      (event.dataTransfer.effectAllowed = 'move');
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
