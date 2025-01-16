import { Alert } from "../../components/Alert/index.js";
import { Card } from "../../components/Card/index.js";
import { ColumnTitle } from "../../components/ColumnTitle/index.js";
import { useState } from "../../lib/HamReact/hooks/useState.js";
import { parser } from "../../lib/jsx-runtime/index.js";

import styles from "./todoColumn.module.js";

const TodoItem = (todo) => parser`
                  <li key="${todo.id}">
                  ${Card({ type: "add-edit" })}
                  </li>`;

/**
 *
 * @param {object} props - Todo 컬럼의 속성.
 * @param {string} props.title - Todo 컬럼의 제목.
 * @param {Function} props.onClickDel - Todo 컬럼 삭제 버튼 클릭 시 실행할 함수.
 * @returns {VDOM} - Todo 컬럼을 나타내는 VDOM.
 */
export const TodoColumn = ({ title, onClickDel }) => {
  const [todos, setTodos] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAddTodo = () => {
    const newTodo = {
      id: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleClickDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return parser`
        <div class="${styles.container}">
            ${ColumnTitle({
    title, count: todos.length, onClickPlus: handleClickAddTodo, onClickDel,
  })}
            <ul class="${styles.list}">
                ${todos.map((todo) => TodoItem(todo))}
            </ul>
        </div>
    `;
};
