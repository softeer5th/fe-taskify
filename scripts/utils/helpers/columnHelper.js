import Card from '../../components/card.js';
import { addLogToHistory } from './etcHelper.js';
import { updateHistory } from './localStorageHelper.js';

/**
 * 카드 생성 함수
 * @param {'default' | 'add' | 'drag' | 'place'} mode - 카드 모드
 * @param {object} cardData - 카드 데이터
 * @param {HTMLElement} columnElement - 컬럼 요소
 * @param {object} columnState - 컬럼 상태
 * @returns {HTMLElement} - 카드 요소를 포함하는 HTMLElement
 */
const createCard = (mode, cardData, columnElement, columnState) => {
  const cardElement = Card({
    mode,
    cardData,
    addCard: (updatedCardData) => {
      columnState.setState((prev) => ({
        ...prev,
        cards: [updatedCardData, ...prev.cards],
      }));
      updateHistory({
        actionType: 'add',
        cardTitle: updatedCardData.title,
        fromColumnName: columnState.getState().columnName,
        loggedTime: new Date(),
      });
    },
    deleteCard: (deleteCardData, isForDelete) => {
      columnState.setState((prev) => ({
        ...prev,
        cards: prev.cards.filter((card) => card.id !== deleteCardData.id),
      }));
      if (isForDelete)
        updateHistory({
          actionType: 'delete',
          cardTitle: deleteCardData.title,
          fromColumnName: columnState.getState().columnName,
          loggedTime: new Date(),
        });
    },
    editCard: (updatedCardData) => {
      columnState.setState((prev) => ({
        ...prev,
        cards: prev.cards.map((card) =>
          updatedCardData.id === card.id ? updatedCardData : card
        ),
      }));
      updateHistory({
        actionType: 'edit',
        cardTitle: updatedCardData.title,
        loggedTime: new Date(),
      });
    },
    initCardsInColumn: () => initCardsInColumn(columnElement, columnState),
  });

  return cardElement;
};

/**
 * 컬럼에 있는 카드들 초기화하는 함수
 * @param {HTMLElement} columnElement
 * @param {object} columnState
 */
const initCardsInColumn = (columnElement, columnState) => {
  columnElement
    .querySelectorAll('li')
    .forEach((cardElement) => cardElement.remove());
  columnState.getState().cards.forEach((cardData) => {
    columnElement.appendChild(
      createCard('default', cardData, columnElement, columnState)
    );
  });
};

export { createCard, initCardsInColumn };
