import { addTask, getTaskByTimestamp } from '../utils/storage/taskManager.js';

export const popupCardModal = (parentColumn) => {
  const newTask = document.createElement('li');
  newTask.className = 'task'
  newTask.innerHTML = `
    <div class ="task-add-modal">
      <div class ="title-cont-au" >
       <input class = "task-title" placeholder="제목을 입력하세요">
       <input placeholder="내용을 입력하세요">
      </div>
      <div class = "add-can-btn">
       <button class = "task-add-can-btn"> 취소 </button>
       <button class = "task-add-add-btn" style="opacity: 30%"> 등록 </button>
      </div>
    </div>
  `;
  parentColumn.appendChild(newTask);
}

export const closeCardModal = (parentColumn) => {
  const taskAddModal = parentColumn.querySelector('.task-add-modal');
  const targetTask = taskAddModal.closest('.task');
  targetTask.remove();
}

export const makeCard = (task, parentColumn) => {
  const taskAddModal = parentColumn.querySelector('.task-add-modal');

  if (taskAddModal) {
    const targetTask = taskAddModal.closest('.task');
    targetTask.remove();
  }

  const newTask = document.createElement('li');
  newTask.className = 'task';
  newTask.setAttribute('data-timestamp', task.timestamp);
  newTask.innerHTML = `
    <div class="title-cont-au">
      <div class = "content-author-divider">
        <div class="task-title">${task.title}</div>
        <div class="task-body">${task.body}</div>
      </div>  
      <div class="task-author">author by me</div>
    </div>
    <div class="card-delete-edit">
      <button class = "card-close-btn"> 
        <img src="../assets/icon/closed.svg" alt="close">
      </button>
      <button class = "card-edit-btn"> 
        <img src="../assets/icon/edit.svg" alt="edit" >
      </button>
    </div>
  `;

  if (document.querySelector('.sort-btn').getAttribute('card-sort') === '1') {
    parentColumn.appendChild(newTask);
  } else {
    parentColumn.insertBefore(newTask, parentColumn.querySelector('.task'));
  }

  const columnKey = parentColumn.getAttribute('data-column-key');
  if (!getTaskByTimestamp(columnKey, task.timestamp)) {
    addTask(columnKey, task);
    parentColumn.querySelector('.column-count').textContent++;
  }
}