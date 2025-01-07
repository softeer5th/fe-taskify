const addTask = () => {
  const newTask = document.createElement('li');
  newTask.className = 'task'
  newTask.innerHTML = `
    <div class ="title-cont-au">
     <div class = "task-title">Github 공부하기</div>
     <div class = "task-body">내용</div>
     <div class = "task-author">작성자</div>
    </div>
    <div class = "delete-edit">
     <div> x </div>
     <div> e </div>
    </div>
  `;

  document.querySelector('.column').appendChild(newTask);
}