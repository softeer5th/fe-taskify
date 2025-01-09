import { addTask, removeTask, editTask, moveTask } from '../utils/storage/taskManager.js';


const popupCardModal = (parentColumn) => {
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

const closeCardModal = (parentColumn) => {
  const taskAddModal = parentColumn.querySelector('.task-add-modal');
  const targetTask = taskAddModal.closest('.task');
  targetTask.remove();
}

const makeCard = (task, parentColumn) => {
  const taskAddModal = parentColumn.querySelector('.task-add-modal');

  if (taskAddModal) {
    const targetTask = taskAddModal.closest('.task');
    targetTask.remove();
  }

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

  parentColumn.appendChild(newTask);
  const columnKey = parentColumn.getAttribute('data-column-key');
  addTask(columnKey, task);
}

// modal 에서 등록 버튼 , 취소 버튼 클릭시
document.addEventListener('click', (e) => {
  const parentColumn = e.target.closest('.column');
  if (e.target.classList.contains('add-btn')) {
    popupCardModal(parentColumn);
  } else if (e.target.classList.contains('task-add-add-btn')) {
    const title = parentColumn.querySelector("input").value;
    const body = parentColumn.querySelector('input:last-child').value;
    const task = { title: title, body: body, author: 'me', timestamp: Date.now() };
    makeCard(task, parentColumn);
  } else if (e.target.classList.contains('task-add-can-btn')) {
    closeCardModal(parentColumn);
  }
});


//x 버튼
document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => {
    const parentColumn = button.closest('.Task');
  });
});






