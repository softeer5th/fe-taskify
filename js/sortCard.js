import { addTask, getTaskByTimestamp } from '../utils/storage/taskManager.js';

export const sortCard = (sortFlag) => {
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

    tasks.forEach((task, index) => {
      const taskElement = col.querySelector(`.task[data-timestamp="${task.timestamp}"]`);
      if (taskElement) {
        taskElement.style.order = index;
      }
    });
  });
};



