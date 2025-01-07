const addTask = () => {
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

  //더미데이터 추가
  // newTask.innerHTML = `
  //   <div class ="title-cont-au">
  //    <div class = "task-title">Github 공부하기</div>
  //    <div class = "task-body">내용</div>
  //    <div class = "task-author">작성자</div>
  //   </div>
  //   <div class = "delete-edit">
  //    <div> x </div>
  //    <div> e </div>
  //   </div>
  // `;
  document.querySelector('.column').appendChild(newTask);
}