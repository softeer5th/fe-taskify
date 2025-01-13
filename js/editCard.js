import { editTask } from '../utils/storage/taskManager.js';

let globalTaskCopy = null;
let globalTask = null;

export const editCard = (task) => {
  globalTask = task;
  globalTaskCopy = task.cloneNode(true);
  popupEditModal(task);
};

const popupEditModal = (task) => {
  task.innerHTML = `
    <div class ="task-add-modal">
      <div class ="title-cont-au" >
       <input class = "task-title" placeholder="제목을 입력하세요">
       <input placeholder="내용을 입력하세요">
      </div>
      <div class = "add-can-btn">
       <button class = "task-edit-can-btn"> 취소 </button>
       <button class = "task-edit-add-btn" style="opacity: 30%"> 등록 </button>
      </div>
    </div>
  `;
}

export const closeEditModal = (isEdited) => {
  if (isEdited) {
    // store 에 저장 후, 화면에 렌더링
    const title = globalTask.querySelector('.task-title').value;
    const body = globalTask.querySelector('input:last-child').value;
    const task = {
      title: title,
      body: body,
      author: 'me',
      timestamp: globalTask.getAttribute('data-timestamp')
    };
    console.log(globalTask);
    editTask(globalTask.closest('.column').getAttribute('data-column-key'), task.timestamp, task);
    globalTask.innerHTML = `
      <div class="title-cont-au">
        <div class = "content-author-divider">
          <div class="task-title
          ">${task.title}</div>
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
  } else {
    globalTask.innerHTML = globalTaskCopy.innerHTML;
  }
}

