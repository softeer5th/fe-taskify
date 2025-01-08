import Card from './card.js';

const Column = () => {
  const wrapper = document.createElement('div');

  const column = document
    .getElementById('column-template')
    .content.cloneNode(true);

  for (let i = 0; i < 3; i++) {
    column.getElementById('column-section').appendChild(Card());
  }

  wrapper.appendChild(column);

  return wrapper;
};

export default Column;
