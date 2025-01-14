/**
 * 컬럼 모델
 * @typedef {Object} Column
 * @property {number} columnId - 컬럼 ID
 * @property {string} columnName - 컬럼 이름
 * @property {Card[]} cards - 카드 배열
 */
class Column {
  constructor(columnId, columnName, cards = []) {
    this.columnId = columnId;
    this.columnName = columnName;
    this.cards = cards;
  }
}

export default Column;