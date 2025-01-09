import Card from './card.js';

const Column = (columnTitle) => {
  const column = document
    .getElementById('column-template')
    .content.cloneNode(true);

  column.querySelector('h2').textContent = columnTitle;

  column.querySelector('ul').appendChild(Card('delete'));
  column.querySelector('ul').appendChild(Card('add'));
  column.querySelector('ul').appendChild(Card('edit'));


  column.querySelector('#add-card').addEventListener('click', (e) => {
    console.log('add card');
  });
  column.querySelector('#close-column').addEventListener('click', (e) => {
    console.log('close column');
  });

  return column;
};

export default Column;
