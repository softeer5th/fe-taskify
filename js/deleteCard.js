import { removeTask } from '../utils/storage/taskManager.js';
import { getTaskByTimestamp } from '../utils/storage/taskManager.js';

export const deleteCard = (task) => {
  deleteCardModal(task);
}

const deleteCardModal = (task) => {
  task.innerHTML = `
    <div class ="task-add-modal">
      <div class ="title-cont-au" >
       <div>
       정말 삭제하시겠습니까?
       </div>
      </div>
      <div class = "add-can-btn">
       <button class = "task-delete-cancel-btn"> 취소 </button>
       <button class = "task-delete-confirm-btn" style="background-color: rgba(255, 59, 48, 1)"> 삭제 </button>
      </div>
    </div>
  `;
}

export const closeDeleteModal = (isConfirm, task) => {
  const storedTask = getTaskByTimestamp(task.closest('.column').getAttribute('data-column-key'),
    parseInt(task.getAttribute('data-timestamp')));
  console.log(storedTask);
  if (isConfirm) {
    removeTask(task.closest('.column').getAttribute('data-column-key'),
      task.getAttribute('data-timestamp'));
    task.remove();
  } else {
    task.innerHTML = `
      <div class="title-cont-au">
        <div class = "content-author-divider">
          <div class="task-title
          ">${storedTask.title}</div>
          <div class="task-body">${storedTask.body}</div>
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

  }
}