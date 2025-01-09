import { addCardButtons, addCardShadow } from '../utils/helpers/cardHelper.js';
import Button from './button.js';

/**
 * 카드 컴포넌트
 * @param {'default' | 'add' | 'drag' | 'place'} mode
 * @returns
 */
const Card = (mode) => {
  const card = document.getElementById('card-template').content.cloneNode(true);
  const cardElement = card.querySelector('li');

  
  cardElement.addEventListener('click', (e) => {
    console.log('card click');
  });

  
  addCardShadow(cardElement, mode);
  addCardButtons(cardElement, mode, true, false);
  
  if (mode == 'place') {
    cardElement.style.opacity = '0.3';
  }

  return card;
};

export default Card;
