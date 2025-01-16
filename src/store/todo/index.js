import Todo from "./todo.js";

class TodoStore {
  #todos;

  #currentTodoId;

  constructor() {
    this.#todos = {};
    this.#currentTodoId = 0;
  }

  addTodo = ({ columnId }) => {
    const todo = new Todo({ columnId, id: this.#currentTodoId });

    if (!this.#todos[columnId]) { this.#todos[columnId] = []; }
    this.#todos[columnId].push(todo);

    return todo.getTodoId();
  };

  removeTodo = ({ columnId, todoId }) => {
    this.#todos[columnId] = this.#todos[columnId].filter((todo) => !todo.isSameTodo(todoId));
    return this.#todos[columnId];
  };

  switchTodo = ({ beforeColumnId, afterColumnId, todoId }) => {
    this.removeTodo({
      columnId: beforeColumnId,
      todoId,
    });
    this.#todos[afterColumnId].push(todoId);
  };

  getTodos = (columnId) => this.#todos[columnId];
}

export default TodoStore;
