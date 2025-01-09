import { getColumnTasks } from '../utils/storage/taskManager.js';
import { addColumn } from '../utils/storage/columnManager.js';

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
    //task count 를 위한 코드
    const tasks = getColumnTasks(dataColumnKey);
    const taskCount = tasks ? tasks.length : 0;

    //column 추가
    const newColumn = document.createElement('ol');
    newColumn.className = 'column';
    newColumn.setAttribute('data-column-key', `${dataColumnKey++}`);
    newColumn.innerHTML = `
      <li class="task-list">
        <div class="column-title">${column}</div>
        <div class="column-count">${taskCount}</div>
        <div class="add-btn">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6667 8.66533H8.66668V12.6653H7.33334V8.66533H3.33334V7.332H7.33334V3.332H8.66668V7.332H12.6667V8.66533Z" fill="#A0A3BD"/>
          </svg> 
        </div>
        <div class="edit-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="#A0A3BD"/>
          </svg>
        </div>
      </li>
    `;
    const taskList = document.querySelector('.task-lists');
    taskList.appendChild(newColumn);
  });
}