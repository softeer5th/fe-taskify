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
    // TODO: 바뀐 데이터를 로컬스토리지나 서버에 저장해야함
    columnElement.querySelector('.textlabel').textContent =
      columnState.getState().cards.length;
    console.log(columnState.getState());
  });

  columnElement.querySelector('h2').textContent = columnData.columnName;
  columnElement.querySelector('.textlabel').textContent =
    columnState.getState().cards.length;

  columnData.cards.forEach((cardData) => {
    columnElement.appendChild(
      Card(
        'default',
        cardData,
        (newData) =>
          columnState.setState((prevState) => ({
            ...prevState,
            cards: prevState.cards.map((card) =>
              card.id === newData.id ? newData : card
            ),
          })),
        (removeCardId) =>
          columnState.setState((prev) => ({
            ...prev,
            cards: prev.cards.filter((card) => card.id !== removeCardId),
          }))
      )
    );
  });

  columnElement.querySelector('#add-card').addEventListener('click', (e) => {
    const newCard = Card(
      'add',
      {
        id: Date.now + Math.random(),
        title: null,
        body: null,
        createdDate: new Date().toISOString(),
      },
      (cardData) =>
        columnState.setState((prevState) => ({
          ...prevState,
          cards: [cardData, ...prevState.cards],
        })),
      (removeCardId) =>
        columnState.setState((prevState) => ({
          ...prevState,
          cards: prevState.cards.filter((card) => card.id !== removeCardId),
        }))
    );

    const firstChild = columnElement.querySelector('li'); // 첫 번째 자식 요소 선택
    if (firstChild) {
      columnElement.insertBefore(newCard, firstChild);
    } else {
      columnElement.appendChild(newCard);
    }

    columnElement.querySelector('#add-card').disabled = true;
  });

  columnElement
    .querySelector('#close-column')
    .addEventListener('click', (e) => {
      columnElement.remove();
      // TODO: 상위 요소에게 컬럼 삭제 이벤트 전달
    });

  return column;
};

export default Column;
