import {setStorage,getStorage,editStorage,removeStorage} from '../utils/localStorage.js';

const addTask = (parentColumn) => {
  const newTask = document.createElement('li');
  newTask.className = 'task'
  newTask.innerHTML = `
    <div class ="task-add-modal">
      <div class ="title-cont-au" >
       <input class = "task-title" placeholder="제목을 입력하세요">
       <input placeholder="내용을 입력하세요">
      </div>
      <div class = "add-can-btn">
       <div class = "task-add-can-btn"> 취소 </div>
       <div class = "task-add-add-btn" style="opacity: 30%"> 등록 </div>
      </div>
    </div>
  `;
  parentColumn.appendChild(newTask);
}

//delete Task 구현해야함

const deleteTask = (parentColumn) => {
  const newTask = document.createElement('li');
  newTask.className = 'task'
  newTask.innerHTML = `
    <div class ="task-add-modal">
      <div class ="title-cont-au" >
       <input class = "input-title" placeholder="제목을 입력하세요">
       <input class = "input-body" placeholder="내용을 입력하세요">
      </div>
      <div class = "add-can-btn">
       <div class = "task-add-can-btn" id = "task-add-can-btn"> 취소 </div>
       <div class = "task-add-add-btn" id = "task-add-add-btn" style="opacity: 30%"> 등록 </div>
      </div>
    </div>
  `;
  parentColumn.appendChild(newTask);
}

//add 버튼
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const parentColumn = button.closest('.column');
    addTask(parentColumn);
    setStorage('task', 'hihi');
  });
});

//x 버튼
document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => {
    const parentColumn = button.closest('.column');
    deleteTask(parentColumn);
    console.log(getStorage('task'));
  });
});

document.getElementById('task-add-can-btn').addEventListener('click',deleteTask )

document.getElementById('task-add-add-btn').addEventListener('click',setStorage() )


