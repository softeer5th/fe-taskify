import { ACTION_TYPE } from "../../../constants/action.js";
import todoStore from "../../../store/TodoStore.js";
import loadStyleSheet from "../../../utils/loadStyleSheet.js";
import ColumnItem from "../../ColumnItem/ColumnItem.js";
import createColumnBody from "./ui/createColumnBody.js";

loadStyleSheet("/components/ColumnSection/ColumnBody/styles.css");

const ColumnBody = ({ sectionId, items }) => {
  const $columnBody = createColumnBody({
    sectionId,
    items,
  });

  return $columnBody;
};

export default ColumnBody;

todoStore.subscribe(
  (action, { sectionId, newTodo, deletedId, updatedTodo, todoList }) => {
    const $columnBody = document.querySelector(`#${sectionId} .column__body`);

    switch (action) {
      case ACTION_TYPE.move:
        updateColumnCountAll(todoList);
        return;

      case ACTION_TYPE.add:
        $columnBody.replaceChild(
          ColumnItem({ ...newTodo }),
          $columnBody.firstChild
        );

        updateCount({
          $columnBody,
          newTodoList: todoList,
          sectionId,
        });
        break;

      case ACTION_TYPE.remove:
        const $columnItem = document.querySelector(
          `.column__item[data-id="${deletedId}"]`
        );

        $columnItem.remove();

        updateCount({
          $columnBody,
          newTodoList: todoList,
          sectionId,
        });
        break;

      case ACTION_TYPE.update:
        const $updatedColumnItem = document.querySelector(
          `.column__item[data-id="${updatedTodo.id}"]`
        );

        $updatedColumnItem.replaceWith(ColumnItem({ ...updatedTodo }));

        updateCount({
          $columnBody,
          newTodoList: todoList,
          sectionId,
        });
        break;
    }
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

const updateColumnCountAll = (newTodoList) => {
  const $columnMain = document.querySelector(".column__main");

  newTodoList.forEach(({ id, items }) => {
    const $count = $columnMain
      .querySelector(`#${id}`)
      .querySelector(".column__count");

    $count.textContent = items.length;
  });
};
