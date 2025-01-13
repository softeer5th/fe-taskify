import {
  initCardTextArea,
  initCardIconButtons,
  initCardButtons,
  setCardShadow,
  toggleDisplay,
} from '../utils/helpers/cardHelper.js';

/**
 * @typedef {Object} Card
 * @property {number} id - 카드 ID
 * @property {string} title - 카드 제목
 * @property {string} body - 카드 내용
 * @property {string} createdDate - 카드 생성일
 */

/**
 * 카드 컴포넌트
 * @param {'default' | 'add' | 'drag' | 'place'} mode - 카드 모드
 * @param {Card} cardData - 카드 데이터
 * @returns {DocumentFragment} - 카드 요소를 포함하는 DocumentFragment
 */
const Card = (mode = 'default', cardData) => {
  const card = document.getElementById('card-template').content.cloneNode(true);
  const cardElement = card.querySelector('li');

  initCardTextArea(cardElement, mode, cardData, () => {});
  initCardIconButtons(cardElement, mode);
  initCardButtons(cardElement);

  const isEditMode = true;
  setCardState(cardElement, cardData, mode, isEditMode);

  return card;
};

/**
 * 
 * @param {HTMLElement} cardElement 
 * @param {Card} cardData 
 * @param {string} mode 
 * @param {boolean} isEditMode 
 */
const setCardState = (cardElement, cardData, mode, isEditMode) => {
  toggleDisplay(cardElement.querySelector('#text-form'), mode === 'add');
  toggleDisplay(cardElement.querySelector('#freezed-text'), mode !== 'add');
  toggleDisplay(cardElement.querySelector('#icon-area'), mode !== 'add');
  toggleDisplay(cardElement.querySelector('#button-area'), mode === 'add');

  toggleDisplay(cardElement.querySelector('#add-button'), !isEditMode);
  toggleDisplay(cardElement.querySelector('#edit-button'), isEditMode);
  
  cardElement.querySelectorAll('#button-area button').forEach((button, index) => {
    if (index !== 0) {
      button.disabled = cardData.title === null || cardData.body === null;
    }
  });

  setCardShadow(cardElement, mode);

  if (mode == 'place') {
    cardElement.style.opacity = '0.3';
  } else {
    cardElement.style.opacity = '1';
  }
};

export default Card;
