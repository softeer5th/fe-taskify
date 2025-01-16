import { Alert } from "../../components/Alert/index.js";
import { Card } from "../../components/Card/index.js";
import { ColumnTitle } from "../../components/ColumnTitle/index.js";
import { useState } from "../../lib/HamReact/hooks/useState.js";
import { store } from "../../lib/HamReact/store.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./todoColumn.module.js";

/**
 *
 * @param {object} props - Todo 컬럼의 속성.
 * @param {number} props.id - Todo 컬럼의 식별자.
 * @param {object[]} props.todoStore - Todo 저장소.
 * @param {string} props.name - Todo 컬럼의 이름.
 * @param {Function} props.onClickDel - Todo 컬럼 삭제 버튼 클릭 시 실행할 함수.
 * @returns {VDOM} - Todo 컬럼을 나타내는 VDOM.
 */
export const TodoColumn = ({
  id: columnId, todoStore, name, onClickDel,
}) => {
  const [todos, setTodos] = useState(todoStore.getTodos(columnId));
  const [cardType, setCardType] = useState("add-edit");
  const [todoFlag, setTodoFlag] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const createTodo = () => {
    const newTodoId = todoStore.addTodo({ columnId });
    setTodos([...todos, newTodoId]);
    setTodoFlag(true);
  };

  const deleteTodo = (id) => {
    const deletedTodos = todoStore.removeTodo({
      columnId,
      todoId: id,
    });
    setTodos(deletedTodos);
  };

  const handleClickToggleTodo = () => {
    if (!todoFlag) {
      createTodo();
      return;
    }
    const id = todos.pop();
    deleteTodo(id);
    setTodoFlag(false);
  };

  const handleClickDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const TodoItem = (todo) => parser`<li key=${todo}>
  ${Card({
    id: todo,
    type: cardType,
    onClickEditBtn() {
      setCardType("add-edit");
    },
    onClickDelBtn() {
      setOpenAlert(true);
    },
    onClickEnrollBtn() {
      setCardType("default");
      setTodoFlag(false);
    },
    onClickCancelBtn() {
      handleClickDeleteTodo(todo);
    },
  })}
  ${openAlert && Alert({
    text: "선택한 카드를 삭제할까요?",
    isOpen: openAlert,
    onClose() {
      setOpenAlert(false);
    },
    rightOnClick() {
      handleClickDeleteTodo(todo);
    },
  })} 
</li>`;

  return parser`
        <div class="${styles.container}">
            ${ColumnTitle({
    title: name,
    count: todos.length,
    onClickPlus: handleClickToggleTodo,
    onClickDel,
  })}
            <ul class="${styles.list}">
                ${todos.map(TodoItem)}
            </ul>
        </div>
    `;
};
