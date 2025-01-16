import { ACTION_TYPE } from "../../constants/action.js";
import todoStore from "../../store/TodoStore.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createColumnItem from "./ui/createColumnItem.js";

loadStyleSheet("/components/ColumnItem/styles.css");

const ColumnItem = ({ id, title = "", content = "", author = "web" }) => {
  const $columnItem = createColumnItem({
    itemId: id,
    title,
    content,
    author,
  });

  return $columnItem;
};

todoStore.subscribe(
  (action, { sectionId, newTodo, deletedId, updatedTodo, todoList }) => {
    const $columnBody = document.querySelector(`#${sectionId} .column__body`);

    if (action === ACTION_TYPE.add) {
      $columnBody.replaceChild(
        ColumnItem({ ...newTodo }),
        $columnBody.firstChild
      );
    } else if (action === ACTION_TYPE.remove) {
      const $columnItem = document.querySelector(
        `.column__item[data-id="${deletedId}"]`
      );

      $columnItem.remove();
    } else if (action === ACTION_TYPE.update) {
      const $columnItem = document.querySelector(
        `.column__item[data-id="${updatedTodo.id}"]`
      );

      $columnItem.replaceWith(ColumnItem({ ...updatedTodo }));
    }

    updateCount({
      $columnBody,
      newTodoList: todoList,
      sectionId,
    });
  }
);

const updateCount = ({ $columnBody, newTodoList, sectionId }) => {
  const itemLength = newTodoList.find((section) => section.id === sectionId)
    .items.length;

  const $columnCount = $columnBody
    .closest(".column__container")
    .querySelector(".column__count");

  $columnCount.textContent = itemLength;
};

export default ColumnItem;
