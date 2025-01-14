import { editTask } from "../../utils/storage/taskManager.js";
import { getTaskByTimestamp } from "../../utils/storage/taskManager.js";

export const editCard = (task) => {
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
};

export const closeEditModal = (isEdited, task) => {
  const beforeTask = getTaskByTimestamp(
    task.closest(".column").getAttribute("data-column-key"),
    parseInt(task.getAttribute("data-timestamp"))
  );
  if (isEdited) {
    const title = task.querySelector(".task-title").value;
    const body = task.querySelector("input:last-child").value;
    const timestamp = parseInt(task.getAttribute("data-timestamp"));
    const newTask = {
      title: title,
      body: body,
      author: "me",
      timestamp: timestamp,
    };

    editTask(
      task.closest(".column").getAttribute("data-column-key"),
      task.getAttribute("data-timestamp"),
      newTask
    );

    task.innerHTML = `
      <div class="title-cont-au">
        <div class = "content-author-divider">
          <div class="task-title
          ">${title}</div>
          <div class="task-body">${body}</div>
        </div>
        <div class="task-author">author by me</div>
      </div>
      <div class="card-delete-edit">
        <button class = "card-close-btn"> 
          <img src="../../assets/icon/closed.svg" alt="close">
        </button>
        <button class = "card-edit-btn"> 
          <img src="../../assets/icon/edit.svg" alt="edit" >
        </button>
      </div>
    `;
  } else {
    task.innerHTML = `
      <div class="title-cont-au">
        <div class = "content-author-divider">
          <div class="task-title
          ">${beforeTask.title}</div>
          <div class="task-body">${beforeTask.body}</div>
        </div>
        <div class="task-author">author by me</div>
      </div>
      <div class="card-delete-edit">
        <button class = "card-close-btn"> 
          <img src="../../assets/icon/closed.svg" alt="close">
        </button>
        <button class = "card-edit-btn"> 
          <img src="../../assets/icon/edit.svg" alt="edit" >
        </button>
      </div>
    `;
  }
};
