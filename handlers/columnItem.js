import ColumnInputItem from "../components/ColumnInputItem/ColumnInputItem.js";
import createModal from "../components/Modal/createModal.js";
import historyStore from "../store/historyStore.js";
import todoStore from "../store/TodoStore.js";

export const handleClickDelete = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const itemId = Number($columnItem.dataset.id);

  const $modalContainer = document.getElementById("modal-container");
  $modalContainer.dataset.itemId = itemId;

  createModal({
    content: "선택한 카드를 삭제할까요?",
  });
};

export const handleClickEdit = (e) => {
  const $columnItem = e.target.closest(".column__item");
  const $textBox = e.target.closest(".column__item__textContainer").firstChild;

  const title = $textBox.firstChild.textContent;
  const content = $textBox.lastChild.textContent;
  const itemId = Number($columnItem.dataset.id);

  const $columnInputItem = ColumnInputItem({
    id: itemId,
    title,
    content,
    type: "edit",
  });

  $columnItem.replaceWith($columnInputItem);
};

export const deleteColumnItem = ({ sectionId, itemId }) => {
  const deletedCard = todoStore.todoList
    .find((section) => section.id === sectionId)
    .items.find((item) => item.id === itemId);

  todoStore.remove({
    sectionId,
    deletedId: deletedCard.id,
  });
  historyStore.action({
    action: "remove",
    title: deletedCard.title,
  });
};
