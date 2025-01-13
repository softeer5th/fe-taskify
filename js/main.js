import { closeCardModal, makeCard, popupCardModal } from './addCard.js';
import {
  getColumnTasks,
  removeTask,
  editTask,
  getTaskByTimestamp
} from '../utils/storage/taskManager.js';
import { getColumn, setDefaultColumn } from './setColumn.js';
import { sortCard } from './sortCard.js';
import { editCard, closeEditModal } from './editCard.js';
import { deleteCard, closeDeleteModal } from './deleteCard.js';

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

document.addEventListener('click', ({ target }) => { // 이벤트 위임 & 이벤트 객체 분해
  const parentColumn = target.closest('.column');
  const task = target.closest('.task');
  if (target.closest('.add-btn')) { // + 버튼 클릭시
    popupCardModal(parentColumn);
  } else if (target.classList.contains('task-add-add-btn')) { // 등록 버튼 클릭시
    const title = parentColumn.querySelector("input").value;
    const body = parentColumn.querySelector('input:last-child').value;
    const task = { title: title, body: body, author: 'me', timestamp: Date.now() };
    makeCard(task, parentColumn);
  } else if (target.classList.contains('task-add-can-btn')) { // 취소 버튼 클릭시
    closeCardModal(parentColumn);
  } else if (target.closest('.sort-btn')) {
    console.log(target.closest('.sort-btn').getAttribute('card-sort'));
    sortCard(target.closest('.sort-btn').getAttribute('card-sort'));
  } else if (target.closest('.card-close-btn')) {
    deleteCard(task);
  } else if (target.closest('.task-delete-cancel-btn')) {
    closeDeleteModal(false, task);
  } else if (target.closest('.task-delete-confirm-btn')) {
    closeDeleteModal(true, task);
  } else if (target.closest('.card-edit-btn')) {
    editCard(task);
  } else if (target.closest('.task-edit-add-btn')) {
    closeEditModal(true, task);
  } else if (target.closest('.task-edit-can-btn')) {
    closeEditModal(false, task);
    console.log(task);
  }
});







