import Column from "./column.js";

class ColumnStore {
  #columns;

  #currentColumnId;

  constructor() {
    this.#columns = [
      new Column({ id: 0, name: "해야할 일" }),
      new Column({ id: 1, name: "하고 있는 일" }),
      new Column({ id: 2, name: "완료한 일" }),
    ];
    this.#currentColumnId = 3;
  }

  addColumn() {
    const column = new Column({ id: this.#currentColumnId, name: "새로운 컬럼" });
    this.#columns.push();
    this.#currentColumnId += 1;
    return column.getColumn();
  }

  removeColumn(id) {
    this.#columns = this.#columns.filter((col) => col !== id);
    return this.#columns.map((column) => column.getColumn());
  }

  getColumns() {
    return this.#columns.map((column) => column.getColumn());
  }
}

export default ColumnStore;
