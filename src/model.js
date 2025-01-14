// Define column structure as a comment or use JSDoc
/**
 * @typedef {Object} Column
 * @property {number} id
 * @property {string} title
 */

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} createdAt
 * @property {string} device
 * @property {number} columnId
 */

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default class Model {
  #model = {};
  #listeners = [];
  constructor() {
    this.#model = {
      history: [
        {
          data: {
            column: [],
            task: [],
            user: {
              name: "TestUser1",
              thumbnailUrl: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
            },
          },
          action: "init",
        },
      ],
      currentPointer: history.length - 1,
      state: {
        editingTaskId: -1,
        editingColumnId: -1,
        movingTaskId: -1,
        order: "latest",
        isHistoryOpen: false,
        mouseOverColumnId: -1,
      },
    };
    this.#listeners = [];
  }

  // Private method

  #notify() {
    this.#listeners.forEach((listener) => listener());
  }

  #pushHistory(newData, action) {
    const newHistory = {
      data: newData,
      action,
      actionTime: Date.now(),
    };
    this.#model.history.push(newHistory);
    this.#model.currentPointer += 1;
    this.#notify();
  }

  // Public method

  getCurrentData() {
    const currentHistory = this.#model.history[this.#model.currentPointer];
    const currentData = currentHistory.data;
    return deepCopy(currentData);
  }

  getCurrentState() {
    return deepCopy(this.#model.state);
  }

  setInitData(initData) {
    this.#model.history[0].data = initData;
    this.#model.currentPointer = 0;
    this.#notify();
  }

  setEditingTaskId(taskId) {
    this.#model.state.editingTaskId = taskId;
    this.#notify();
  }

  unsetEditingTaskId() {
    this.#model.state.editingTaskId = -1;
    this.#notify();
  }

  setEditingColumnId(columnId) {
    this.#model.state.editingColumnId = columnId;
    this.#notify();
  }

  unsetEditingColumnId() {
    this.#model.state.editingColumnId = -1;
    this.#notify();
  }

  setCreatingTaskColumn(columnId) {
    this.#model.state.editingColumnId = columnId;
    this.#model.state.editingTaskId = 0;
    this.#notify();
  }

  unsetEditingColumnTask() {
    this.#model.state.editingTaskId = -1;
    this.#model.state.editingColumnId = -1;
    this.#notify();
  }

  setMovingTaskId(taskId) {
    this.#model.state.movingTaskId = taskId;
    this.#notify();
  }

  unsetMovingTaskId() {
    this.#model.state.movingTaskId = -1;
    this.#notify();
  }

  toggleOrder() {
    this.#model.state.order = this.#model.state.order === "latest" ? "oldest" : "latest";
    this.#notify();
  }

  toggleHistory() {
    this.#model.state.isHistoryOpen = !this.#model.state.isHistoryOpen;
    this.#notify();
  }

  setMouseOverColumnId(columnId) {
    this.#model.state.mouseOverColumnId = columnId;
    this.#notify();
  }

  unsetMouseOverColumnId() {
    this.#model.state.mouseOverColumnId = -1;
    this.#notify();
  }

  addListener(listener) {
    this.#listeners.push(listener);
  }

  removeListener(listener) {
    this.#listeners = this.#listeners.filter((li) => li !== listener);
  }

  initHistory(history) {
    this.#model.history = history;
    this.#model.currentPointer = history.length - 1;
    this.#notify();
  }

  undo() {
    if (this.#model.currentPointer > 1) {
      this.#model.currentPointer -= 1;
      this.#notify();
    }
  }

  redo() {
    if (this.#model.currentPointer < this.#model.history.length - 1) {
      this.#model.currentPointer += 1;
      this.#notify();
    }
  }

  addColumn(addedColumnName) {
    const currentData = this.getCurrentData();
    const newColumn = {
      id: Date.now(), // TODO: Use UUID or other unique id instead
      name: addedColumnName,
    };
    currentData.column.push(newColumn);
    this.#pushHistory(currentData, {
      type: "addColumn",
      addedColumnName: addedColumnName,
    });
    this.#notify();
  }

  updateColumn(columnId, updatedColumTitle) {
    const currentData = this.getCurrentData();
    const columnIdx = currentData.column.findIndex((column) => column.id === columnId);
    currentData.column[columnIdx].title = updatedColumTitle;

    this.#pushHistory(currentData, {
      type: "updateColumn",
      updatedColumnName: updatedColumTitle,
    });

    this.unsetEditingColumnId();
  }

  removeColumn(columnId) {
    const currentData = this.getCurrentData();
    const removedColumn = currentData.column.find((column) => column.id === columnId);
    currentData.column = currentData.column.filter((column) => column.id !== columnId);
    currentData.task = currentData.task.filter((task) => task.columnId !== columnId);
    this.#pushHistory(currentData, {
      type: "removeColumn",
      removedColumnName: removedColumn.title,
    });
    this.unsetEditingColumnTask();
  }

  addTask(columnId, addedTaskName, addedTaskDescription, addedTaskDevice) {
    const currentData = this.getCurrentData();
    const newTask = {
      id: Date.now(), // TODO: Use UUID or other unique id instead
      name: addedTaskName,
      description: addedTaskDescription,
      createdAt: Date.now(),
      device: addedTaskDevice,
      columnId,
    };
    currentData.task.push(newTask);
    this.#pushHistory(currentData, {
      type: "addTask",
      addedTaskName: addedTaskName,
    });
    this.unsetEditingColumnTask();
  }

  updateTask(taskId, updatedTask) {
    const currentData = this.getCurrentData();
    const task = currentData.task.find((task) => task.id === taskId);
    Object.assign(task, updatedTask);
    let historyAction;
    if (task.columnId !== updatedTask.columnId) {
      historyAction = {
        type: "moveTask",
        updatedTaskName: updatedTask.name,
        fromColumnId: task.columnId,
        toColumnId: updatedTask.columnId,
      };
      this.#model.state.movingTaskId = -1;
    } else {
      historyAction = {
        type: "updateTask",
        updatedTaskName: updatedTask.name,
      };
      this.#model.state.editingTaskId = -1;
    }
    this.#pushHistory(currentData, historyAction);
    this.unsetEditingColumnTask();
  }

  removeTask(taskId) {
    const currentData = this.getCurrentData();
    const removedTask = currentData.task.find((task) => task.id === taskId);
    currentData.task = currentData.task.filter((task) => task.id !== taskId);
    this.#pushHistory(currentData, {
      type: "removeTask",
      removedTaskName: removedTask.name,
    });
    this.#notify();
  }

  getCurrentColumnData() {
    return this.getCurrentData().column;
  }

  getCurrentTaskData() {
    return this.getCurrentData().task;
  }
}
