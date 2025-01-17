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
 * @typedef {Object} Todos
 * @property {Column[]} columns - 컬럼 배열
 */

/**
 * 투두 데이터를 로컬스토리지로부터 불러오는 함수
 * @returns {todos} 투두 데이터
 */
const loadTodos = () => {
  let todos = JSON.parse(localStorage.getItem('todos'));

  if (!todos) {
    todos = [
      {
        columnId: 0,
        columnName: '해야할 일',
        cards: [
          // 더미데이터
          {
            id: 1,
            title: '모던 자바스크립트 예제 실습',
            body: '1장 예제 내용 실습 후, 커밋까지',
            createdDate: '2021-08-10',
          },
          {
            id: 2,
            title: 'GitHub 공부하기',
            body: 'add, commit, push',
            createdDate: '2021-08-10',
          },
          {
            id: 3,
            title: '카드 제목',
            body: '카드 내용',
            createdDate: '2021-08-10',
          },
          {
            id: 4,
            title: '카드 제목',
            body: '카드 내용',
            createdDate: '2021-08-10',
          },
        ],
      },
      {
        columnId: 1,
        columnName: '하고 있는 일',
        cards: [],
      },
      {
        columnId: 2,
        columnName: '완료한 일',
        cards: [],
      },
    ];

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return todos;
};

/**
 * 특정 컬럼을 업데이트하는 함수
 * @param {Column} updatedColumn - 업데이트 되는 column
 */
const updateColumn = (updatedColumn) => {
  console.log(updatedColumn);
  const oldTodos = JSON.parse(localStorage.getItem('todos'));
  if (!oldTodos) {
    console.warn('Todos not found');
    return;
  }

  const newTodos = oldTodos.map((column) =>
    column.columnId === updatedColumn.columnId ? updatedColumn : column
  );

  localStorage.setItem('todos', JSON.stringify(newTodos));
};

const loadHistory = () => {
  let history = JSON.parse(localStorage.getItem('history'));

  if (!history) {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
  }

  return history;
};

const updateHistory = (newLog) => {
  const history = loadHistory();

  localStorage.setItem('history', JSON.stringify([newLog, ...history]));
};

const initHistory = () => {
  localStorage.setItem('history', JSON.stringify([]));
};

export { loadTodos, updateColumn, loadHistory, updateHistory, initHistory };
