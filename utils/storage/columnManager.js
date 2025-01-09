import { getColumnTasks } from './taskManager.js';

export const getColumn = () => {
  let columnCount = 1;
  const columns = [];

  while (localStorage.getItem(`column${columnCount}`)) {
    columns.push(JSON.parse(localStorage.getItem(`column${columnCount}`)));
    columnCount++;
  }
  
  return columns;
}

export const setDefaultColumn = () => {
  const columns = getColumn();
  console.log(columns);
  if (!columns.length) { //innerhtml 로 각각의 기본 column 추가
    addColumn('해야할 일');
    addColumn('진행중인 일');
    addColumn('완료한 일');
    columns.push('해야할 일');
    columns.push('진행중인 일');
    columns.push('완료한 일');
  }


  let dataColumnKey = 1;
  columns.forEach(column => {
    const newColumn = document.createElement('ol');
    newColumn.className = 'column';
    newColumn.setAttribute('data-column-key', `${dataColumnKey++}`);
    newColumn.innerHTML = `
      <li class="task-list">
         <div class="column-title">${column}</div>
         <div class="column-count">카운트</div>
         <div class="add-btn"> +</div>
        <div class="edit-btn"> x</div>
      </li>
    `;
    const taskList = document.querySelector('.task-lists');
    taskList.appendChild(newColumn);
  });
}


export const addColumn = (columnTitle) => {
  let columnCount = 1;
  while (localStorage.getItem(`column${columnCount}`)) {
    columnCount++;
  }
  localStorage.setItem(`column${columnCount}`, JSON.stringify(columnTitle));
}

export const removeColumn = (columnNumber) => {
  localStorage.setItem(`column${columnNumber}`,
    JSON.stringify(localStorage.getItem(`column${columnNumber + 1}`)));
  localStorage.setItem('columnNumber', JSON.stringify(getColumnTasks(columnNumber + 1)))
  columnNumber++;
  while (getColumnTasks(columnNumber)) {
    localStorage.setItem(`column${columnNumber}`,
      JSON.stringify(localStorage.getItem(`column${columnNumber + 1}`)));
    localStorage.setItem('columnNumber', JSON.stringify(getColumnTasks(columnNumber + 1)))
    columnNumber++;
  }
}

export const editColumn = (columnNumber, content) => {
  localStorage.setItem(`column${columnNumber}`, JSON.stringify(content));
}

export const moveColumn = (now, togo) => {

}

