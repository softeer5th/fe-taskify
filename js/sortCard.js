import { addTask, getTaskByTimestamp } from '../utils/storage/taskManager.js';

export const sortCard = (sortFlag) => {
  const cardsBefore = document.querySelectorAll('.task');

  cardsBefore.forEach(card => {
    card.remove();
  });

  const cols = document.querySelectorAll('.column');

  cols.forEach(col => {
    const colKey = col.getAttribute('data-column-key');
    const tasks = JSON.parse(localStorage.getItem(colKey));

    if (!tasks) return;

    if (sortFlag === '1') {
      tasks.sort((a, b) => b.timestamp - a.timestamp);
      document.querySelector('.sort-btn').setAttribute('card-sort', '0');
      document.querySelector('.asc').textContent = '최신 순';
    } else {
      tasks.sort((a, b) => a.timestamp - b.timestamp);
      document.querySelector('.sort-btn').setAttribute('card-sort', '1');
      document.querySelector('.asc').textContent = '생성 순';
    }


    tasks.forEach(task => {
      const newTask = document.createElement('li');
      newTask.className = 'task';
      newTask.innerHTML = `
        <div class="title-cont-au">
          <div class="task-title">${task.title}</div>
          <div class="task-body">${task.body}</div>
          <div class="task-author">author by me</div>
        </div>
        <div class="delete-edit">
          <div> x</div>
          <div> e</div>
        </div>
      `;

      col.appendChild(newTask);
      const columnKey = col.getAttribute('data-column-key');
      if (!getTaskByTimestamp(columnKey, task.timestamp)) {
        addTask(columnKey, task);
        col.querySelector('.column-count').textContent++;
      }
    });
  })
};



