import { draggedCardState } from '../main.js';
import {
  createCard,
  initCardsInColumn,
} from '../utils/helpers/columnHelper.js';
import { updateColumn } from '../utils/helpers/localStorageHelper.js';
import createState from '../store/models/stateHelper.js';
import Card from './card.js';
import { addLogToHistory } from '../utils/helpers/etcHelper.js';
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
    updateColumn(columnState.getState());
    columnElement.querySelector('.textlabel').textContent =
      columnState.getState().cards.length;
  });

  columnElement.querySelector('h2').textContent = columnData.columnName;
  columnElement.querySelector('.textlabel').textContent =
    columnState.getState().cards.length;

  columnElement.querySelector('#add-card').addEventListener('click', (e) => {
    const newCard = createCard(
      'add',
      {
        id: null,
        title: null,
        body: null,
        createdDate: null,
      },
      columnElement,
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

  // 카드 초기화
  initCardsInColumn(columnElement, columnState);

  columnElement.addEventListener('dragover', (event) => {
    event.preventDefault(); // 이벤트 전파 방지

    const draggedCard = document.getElementById(
      draggedCardState.getState().cardState.id
    ); // 드래그 중인 요소 선택

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
    event.preventDefault(); // 이벤트 전파 방지
    const draggedCardInfo = draggedCardState.getState().cardState;
    const draggedCardElement = document.getElementById(draggedCardInfo.id); // 드래그 중인 요소 선택

    // drop 이벤트가 발생하고 있다는 것은, draggedCard가 현재 컬럼에서 이동하고 있다는 것으로 간주
    const cards = columnElement.querySelectorAll('li');
    const draggedCardIdx = Array.from(cards).indexOf(draggedCardElement);

    // drop 이벤트가 발생하면, 카드의 고향 컬럼을 초기화
    draggedCardState.getState().fromColumnInit();

    // 컬럼에 추가된 draggedCard를 현재 columnState에 반영
    columnState.setState((prev) => {
      const cards = [...prev.cards];
      cards.splice(draggedCardIdx, 0, { ...draggedCardInfo });
      return { ...prev, cards };
    });
    initCardsInColumn(columnElement, columnState);
    addLogToHistory({
      actionType: 'move',
      cardTitle: draggedCardInfo.title,
      fromColumnName: draggedCardState.getState().fromColumnName,
      toColumnName: columnState.getState().columnName,
      loggedTime: new Date(),
    });

    // draggedCardState 초기화
    draggedCardState.setState(null);
  });

  return columnElement;
};

export default Column;
