import { closeCardModal, makeCard, popupCardModal } from './addCard.js';


document.addEventListener('click', (e) => {
  const parentColumn = e.target.closest('.column');

  if (e.target.classList.contains('add-btn')) { // + 버튼 클릭시
    popupCardModal(parentColumn);
  } else if (e.target.classList.contains('task-add-add-btn')) { // 등록 버튼 클릭시
    const title = parentColumn.querySelector("input").value;
    const body = parentColumn.querySelector('input:last-child').value;
    const task = { title: title, body: body, author: 'me', timestamp: Date.now() };
    makeCard(task, parentColumn);
  } else if (e.target.classList.contains('task-add-can-btn')) { // 취소 버튼 클릭시
    closeCardModal(parentColumn);
  }
});






