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
    // console.log(event.target.closest('ul'));

    const id = event.dataTransfer.getData('card-id'); // 드래그 중인 요소의 ID 가져오기
    console.log('드래거블eeee', id);
    const draggableElement = document.getElementById(id); // 드래그 중인 요소 선택
    // console.log('드래거블', draggableElement);
    const dropzone = event.target.closest('ui'); // 드롭된 위치 선택
    dropzone.appendChild(draggableElement); // 드래그 중인 요소를 드롭된 위치에 추가
    // if (event.target.closest('ul').id) {
    // } else {
    // }
  });

  columnElement.addEventListener('drop', (event) => {
    event.preventDefault(); // 기본 동작 방지
    console.log('드래거블aaa', event.dataTransfer);
    const id = event.dataTransfer.getData('card-id'); // 드래그 중인 요소의 ID 가져오기
    const draggableElement = document.getElementById(id); // 드래그 중인 요소 선택
    const dropzone = event.target.closest('ul'); // 드롭된 위치 선택
    console.log('ee', id, '\neef', draggableElement, '\neea', dropzone);
    dropzone.appendChild(draggableElement); // 드래그 중인 요소를 드롭된 위치에 추가
    event.dataTransfer.clearData(); // 드래그 데이터 초기화
  });

  return columnElement;
};

export default Column;
