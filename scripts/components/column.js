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

  column.querySelector('h2').textContent = columnData.columnName;
  columnData.cards.forEach((cardData) => {
    column.querySelector('ul').appendChild(Card('default', cardData));
  })

  column.querySelector('#add-card').addEventListener('click', (e) => {
    console.log('add card');
  });
  column.querySelector('#close-column').addEventListener('click', (e) => {
    console.log('close column');
  });

  return column;
};

export default Column;
