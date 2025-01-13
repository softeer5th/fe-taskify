import createState from '../utils/helpers/stateHelper.js';
import Card from './card.js';
/**
 * @typedef {Object} Card
 * @property {number} id - 카드 ID
 * @property {string} title - 카드 제목
 * @property {string} body - 카드 내용
 * @property {string} createdDate - 카드 생성일
 */

/**
 * @typedef {Object} Column
 * @property {number} columnId - 컬럼 ID
 * @property {string} columnName - 컬럼 이름
 * @property {Card[]} cards - 카드 배열
 */

/**
 * 컬럼 컴포넌트
 * @param {Column} columnData - 컬럼 데이터
 */
const Column = (columnData) => {
  const column = document
    .getElementById('column-template')
    .content.cloneNode(true);

  /**
   * @type {HTMLElement}
   */
  const columnElement = column.querySelector('ul');

  const columnState = createState(columnData);
  columnState.subscribe(() => {
    columnElement.querySelectorAll('li').forEach((child) => {
      child.remove();
    });

    columnState.getState().cards.forEach((cardData) => {
      columnElement.appendChild(
        Card(cardData.title === null ? 'add' : 'default', cardData)
      );
    });

    column.querySelector('.textlabel').textContent =
      columnState.getState().cards.length;
  });

  column.querySelector('h2').textContent = columnData.columnName;
  columnData.cards.forEach((cardData) => {
    columnElement.appendChild(Card('default', cardData));
  });

  column.querySelector('#add-card').addEventListener('click', (e) => {
    columnState.setState({
      ...columnState.getState(),
      cards: [
        {
          id: columnState.getState().cards.length + 1,
          title: null,
          body: null,
          createdDate: new Date().toISOString(),
        },
        ...columnState.getState().cards,
      ],
    });
  });
  column.querySelector('#close-column').addEventListener('click', (e) => {
    console.log('close column');
  });

  return column;
};

export default Column;
