/**
 * 투두 데이터를 로컬스토리지로부터 불러오는 함수
 * @returns {string[]} 투두 데이터
 */
const loadTodos = () => {
  const Todos = JSON.parse(localStorage.getItem('columns')) || [];
  return Todos;
};

/**
 * 투두 카드를 로컬스토리지에 추가하는 함수
 * @param {Object} options - 옵션 객체
 * @param {string} options.title - 제목
 * @param {string} options.body - 내용
 * @param {string} options.createdDate - 생성일
 * @param {number} targetColumnId - 추가되는 columnId
 */
const addTodos = ({ title, body, createdDate }, targetColumnId) => {
  const Todos = JSON.parse(localStorage.getItem('columns')) || [];
  const targetColumn = Todos.find(
    (column) => column.columnId === targetColumnId
  );

  if (targetColumn) {
    targetColumn.cards.push({
      id: targetColumn.cards.length + 1,
      title,
      body,
      createdDate,
    });
    localStorage.setItem('columns', JSON.stringify(Todos));
  } else {
    console.warn(`Column with id ${targetColumnId} not found`);
  }
};

/**
 * 특정 투두 카드를 로컬스토리지에서 삭제하는 함수
 * @param {number} targetColumnId - 삭제되는 columnId
 * @param {number} targetCardId - 삭제되는 cardId
 */
const deleteTodos = (targetColumnId, targetCardId) => {
  const Todos = JSON.parse(localStorage.getItem('columns')) || [];
  const targetColumn = Todos.find(
    (column) => column.columnId === targetColumnId
  );

  if (targetColumn) {
    targetColumn.cards = targetColumn.cards.filter(
      (card) => card.id !== targetCardId
    );
    localStorage.setItem('columns', JSON.stringify(todos));
  } else {
    console.warn(`Column with id ${targetColumnId} not found`);
  }
};

/**
 * 특정 투두 카드를 로컬스토리지에서 수정하는 함수
 */
const editTodos = (targetColumnId, targetCardId) => {
    const Todos = JSON.parse(localStorage.getItem('columns')) || [];
    const targetColumn = Todos.find(
        (column) => column.columnId === targetColumnId
    );
    
    if (targetColumn) {
        targetColumn.cards = targetColumn.cards.map((card) =>
        card.id === targetCardId ? { ...card, title, body } : card
        );
        localStorage.setItem('columns', JSON.stringify(todos));
    } else {
        console.warn(`Column with id ${targetColumnId} not found`);
    } 
};

export { loadTodos, addTodos, deleteTodos, editTodos };
