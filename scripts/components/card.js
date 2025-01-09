import Button from './button.js';

/**
 * 카드 컴포넌트
 * @param {'add' | 'edit' | 'delete'} mode 
 * @returns 
 */
const Card = (mode) => {
  const card = document.getElementById('card-template').content.cloneNode(true);

  card.querySelector('li').addEventListener('click', (e) => {
    console.log('card click');
  });

  card.querySelector('#buttons-area').appendChild(Button('cancle'));
  switch (mode) {
    case 'add':
      card.querySelector('#buttons-area').appendChild(Button('add'));
      break;
    case 'edit':
      card.querySelector('#buttons-area').appendChild(Button('edit', true));
      break;
    case 'delete':
      card.querySelector('#buttons-area').appendChild(Button('delete'));
      break;
  }

  return card;
};

export default Card;
