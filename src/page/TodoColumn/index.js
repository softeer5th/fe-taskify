import { Alert } from "../../components/Alert/index.js";
import { Card } from "../../components/Card/index.js";
import { ColumnTitle } from "../../components/ColumnTitle/index.js";
import { useState } from "../../lib/HamReact/hooks/useState.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./todoColumn.module.js";

/**
 *
 * @param {object} props - Todo 컬럼의 속성.
 * @param {string} props.title - Todo 컬럼의 제목.
 * @param {Function} props.onClickDel - Todo 컬럼 삭제 버튼 클릭 시 실행할 함수.
 * @returns {VDOM} - Todo 컬럼을 나타내는 VDOM.
 */
export const TodoColumn = ({ title, onClickDel }) => {
  const [todos, setTodos] = useState([]);
  const [cardType, setCardType] = useState("add-edit");
  const [todoFlag, setTodoFlag] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const createTodo = (id) => {
    const newTodo = { id };
    setTodos([...todos, newTodo]);
    setTodoFlag(true);
  };

  const handleClickToggleTodo = () => {
    if (!todoFlag) {
      createTodo(new Date().getTime());
      return;
    }

    todos.pop();
    setTodos([...todos]);
    setTodoFlag(false);
  };

  const handleClickDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const TodoItem = (todo) => parser`<li key=${todo.id}>
  ${Card({
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
      handleClickDeleteTodo(todo.id);
    },
  })}
  ${openAlert && Alert({
    text: "선택한 카드를 삭제할까요?",
    isOpen: openAlert,
    onClose() {
      setOpenAlert(false);
    },
    rightOnClick() {
      handleClickDeleteTodo(todo.id);
    },
  })} 
</li>`;

  return parser`
        <div class="${styles.container}">
            ${ColumnTitle({
    title,
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
