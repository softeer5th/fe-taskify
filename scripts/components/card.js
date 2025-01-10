import { setCardButtons, setCardShadow, setCardIconButtons, setCardTextArea } from '../utils/helpers/cardHelper.js';
import Button from './button.js';

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

  setCardTextArea(cardElement, mode, cardData, () => {});
  setCardIconButtons(cardElement, mode);
  setCardButtons(cardElement, mode, false, false);
  setCardShadow(cardElement, mode);

  if (mode == 'place') {
    cardElement.style.opacity = '0.3';
  }

  return card;
};

export default Card;
