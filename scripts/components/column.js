import { draggedCardIdState } from '../main.js';
import { createCard } from '../utils/helpers/cardHelper.js';
import { updateColumn } from '../utils/helpers/localStorageHelper.js';
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
  /**
   * @type {HTMLElement}
   */
  const columnElement = document
    .getElementById('column-template')
    .content.cloneNode(true)
    .querySelector('ul');

  const columnState = createState(columnData);
  columnState.subscribe(() => {
    // TODO: 바뀐 데이터를 로컬스토리지나 서버에 저장해야함
    console.log('컬럼초기화');
    updateColumn(columnState.getState());
    columnElement.querySelector('.textlabel').textContent =
      columnState.getState().cards.length;
  });

  columnElement.querySelector('h2').textContent = columnData.columnName;
  columnElement.querySelector('.textlabel').textContent =
    columnState.getState().cards.length;

  columnData.cards.forEach((cardData) => {
    columnElement.appendChild(createCard('default', cardData, columnState));
  });

  columnElement.querySelector('#add-card').addEventListener('click', (e) => {
    const newCard = createCard(
      'add',
      {
        id: null,
        title: null,
        body: null,
        createdDate: null,
      },
      columnState
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

  columnElement.addEventListener('dragover', (event) => {
    event.preventDefault(); // 드롭을 허용

    const draggedCard = document.getElementById(draggedCardIdState.getState()); // 드래그 중인 요소 선택
    
    const dropzone_li = event.target.closest('li'); // 드롭된 위치 선택
    const dropzone_ul = event.target.closest('ul'); // 드롭된 위치 선택

    if (dropzone_li) {
      const rect = dropzone_li.getBoundingClientRect();
      const isUpper = event.clientY - rect.top < rect.height / 2;
      if (isUpper) {
        dropzone_li.before(draggedCard); // 절반보다 위인 경우 위에 추가
      } else {
        dropzone_li.after(draggedCard); // 절반보다 아래인 경우 아래에 추가
      }
    } else if (dropzone_ul) {
      const cards = columnElement.querySelectorAll('li');
      if (cards.length === 0) {
        dropzone_ul.appendChild(draggedCard); // 드래그 중인 요소를 드롭된 위치에 추가
        return;
      }
      const lastCard = cards[cards.length - 1];
      const rect = lastCard.getBoundingClientRect();
      const lastCardBottom = rect.top + rect.height;
      if (event.clientY > lastCardBottom) {
        dropzone_ul.appendChild(draggedCard); // 드래그 중인 요소를 드롭된 위치에 추가
      }
    }
  });

  columnElement.addEventListener('drop', (event) => {
    event.preventDefault(); // 기본 동작 방지
    const draggableElement = document.getElementById(draggedCardId.getState()); // 드래그 중인 요소 선택
    const dropzone = event.target.closest('ul'); // 드롭된 위치 선택
    console.log('eef', draggableElement, '\neea', dropzone);
    dropzone.appendChild(draggableElement); // 드래그 중인 요소를 드롭된 위치에 추가
    event.dataTransfer.clearData(); // 드래그 데이터 초기화
  });

  return columnElement;
};

export default Column;
