import { closeCardModal, makeCard, popupCardModal } from './addCard.js';
import { getColumnTasks } from '../utils/storage/taskManager.js';
import { getColumn, setDefaultColumn } from '../utils/storage/columnManager.js';

document.addEventListener('DOMContentLoaded', () => {
  setDefaultColumn();

  const columns = document.querySelectorAll('.column');
  columns.forEach(column => {
    const columnKey = column.getAttribute('data-column-key');
    const tasks = getColumnTasks(columnKey);
    if (!tasks) return;
    tasks.forEach(task => {
      makeCard(task, column);
    });
  });
});

document.addEventListener('click', (e) => {
  console.log(e.target);
  const parentColumn = e.target.closest('.column');
  console.log(parentColumn);
  if (e.target.closest('.add-btn')) { // + 버튼 클릭시
    popupCardModal(parentColumn);
  } else if (e.target.classList.contains('task-add-add-btn')) { // 등록 버튼 클릭시
    const title = parentColumn.querySelector("input").value;
    const body = parentColumn.querySelector('input:last-child').value;
    const task = { title: title, body: body, author: 'me', timestamp: Date.now() };
    makeCard(task, parentColumn);
  } else if (e.target.classList.contains('task-add-can-btn')) { // 취소 버튼 클릭시
    closeCardModal(parentColumn);
  }
});







