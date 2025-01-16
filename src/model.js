// Define column structure as a comment or use JSDoc
/**
 * @typedef {Object} Column
 * @property {number} id
 * @property {string} title
 */

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
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
          actionLog: "init",
          actionTime: Date.now(),
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
        modalState: {
          state: "",
          data: {},
        },
      },
    };
    this.#listeners = [];
  }

  // Private method

  #notify() {
    this.#listeners.forEach((listener) => listener());
  }

  #createHistoryActionLog(actionType, actionData) {
    switch (actionType) {
      case "addColumn":
        return `<strong>${actionData.addedColumnTitle}</strong> 열을 <strong>추가</strong>하였습니다.`;
      case "updateColumn":
        return `<strong>${actionData.updatedColumnTitle}</strong> 열을 <strong>변경</strong>하였습니다.`;
      case "removeColumn":
        return `<strong>${actionData.removedColumnTitle}</strong> 열을 <strong>삭제</strong>하였습니다.`;
      case "addTask":
        return `<strong>${actionData.addedTaskTitle}</strong>을(를) <strong>${actionData.addedColumnTitle}</strong>에 <strong>등록</strong>했습니다.`;
      case "moveTask":
        return `<strong>${actionData.movedTaskTitle}</strong>을(를) <strong>${actionData.fromColumnTitle}</strong>에서 <strong>${actionData.toColumnTitle}</strong>로 <strong>이동</strong>하였습니다.`;
      case "editTask":
        return `<strong>${actionData.updatedTaskTitle}</strong>을(를) <strong>수정</strong>하였습니다.`;
      case "removeTask":
        return `<strong>${actionData.removedTaskTitle}</strong>을(를) <strong>삭제</strong>하였습니다.`;
      default:
        return "";
    }
  }

  #pushHistory(newData, action) {
    const actionLog = this.#createHistoryActionLog(action.type, action);
    const newHistory = {
      data: newData,
      actionLog,
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

  setEditingTaskColumn(columnId) {
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
    if (this.#model.state.movingTaskId !== -1) {
      this.#notify();
    }
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
    if (this.#model.currentPointer > 0) {
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

  addColumn(addedColumnTitle = "New Column") {
    const currentData = this.getCurrentData();
    const newColumn = {
      id: Date.now(), // TODO: Use UUID or other unique id instead
      title: addedColumnTitle,
    };
    currentData.column.push(newColumn);
    this.#pushHistory(currentData, {
      type: "addColumn",
      addedColumnTitle: addedColumnTitle,
    });
  }

  updateColumn(columnId, updatedColumTitle) {
    const currentData = this.getCurrentData();
    const columnIdx = currentData.column.findIndex((column) => column.id === columnId);
    currentData.column[columnIdx].title = updatedColumTitle;

    this.#model.state.editingColumnId = -1;

    this.#pushHistory(currentData, {
      type: "updateColumn",
      updatedColumnTitle: updatedColumTitle,
    });
  }

  removeColumn(columnId) {
    const currentData = this.getCurrentData();
    const removedColumn = currentData.column.find((column) => column.id === columnId);
    currentData.column = currentData.column.filter((column) => column.id !== columnId);
    currentData.task = currentData.task.filter((task) => task.columnId !== columnId);

    this.#model.state.editingColumnId = -1;

    this.#pushHistory(currentData, {
      type: "removeColumn",
      removedColumnTitle: removedColumn.title,
    });
  }

  addTask(columnId, addedTaskTitle, addedTaskDescription, addedTaskDevice) {
    const currentData = this.getCurrentData();
    const newTask = {
      id: Date.now(), // TODO: Use UUID or other unique id instead
      title: addedTaskTitle,
      description: addedTaskDescription,
      createdAt: Date.now(),
      device: addedTaskDevice,
      columnId,
    };
    currentData.task.push(newTask);

    this.#model.state.editingTaskId = -1;
    this.#model.state.editingColumnId = -1;

    const addedColumnTitle = currentData.column.find((column) => column.id === columnId).title;

    this.#pushHistory(currentData, {
      type: "addTask",
      addedTaskTitle: addedTaskTitle,
      addedColumnTitle: addedColumnTitle,
    });
  }

  moveTask(taskId, toColumnId) {
    const currentData = this.getCurrentData();
    let task = currentData.task.find((task) => task.id === taskId);
    const fromColumnId = task.columnId;
    task.columnId = toColumnId;

    this.#model.state.movingTaskId = -1;

    this.#pushHistory(currentData, {
      type: "moveTask",
      movedTaskTitle: task.Title,
      fromColumnTitle: currentData.column.find((column) => column.id === fromColumnId).title,
      toColumnTitle: currentData.column.find((column) => column.id === toColumnId).title,
    });
  }

  editTask(taskId, updatedTask) {
    const currentData = this.getCurrentData();
    const taskIdx = currentData.task.findIndex((task) => task.id === taskId);
    currentData.task[taskIdx] = updatedTask;

    this.#model.state.editingTaskId = -1;

    this.#pushHistory(currentData, {
      type: "editTask",
      updatedTaskTitle: updatedTask.title,
    });
  }

  removeTask(taskId) {
    const currentData = this.getCurrentData();
    const removedTask = currentData.task.find((task) => task.id === taskId);
    currentData.task = currentData.task.filter((task) => task.id !== taskId);
    this.#pushHistory(currentData, {
      type: "removeTask",
      removedTaskTitle: removedTask.title,
    });
  }

  getCurrentColumnData() {
    return this.getCurrentData().column;
  }

  getCurrentTaskData() {
    return this.getCurrentData().task;
  }

  getAllHistoryLogs() {
    const history = deepCopy(this.#model.history.slice(0, this.#model.currentPointer + 1));
    let historyLogs = [];
    history.map((history) => {
      if (history.actionLog !== "init" && history.actionLog !== "") {
        historyLogs = [
          ...historyLogs,
          {
            actionLog: history.actionLog,
            actionTime: history.actionTime,
          },
        ];
      }
    });
    return historyLogs.reverse();
  }

  removeAllHistoryLogs() {
    this.#model.history = [{ ...this.#model.history[this.#model.currentPointer], actionLog: "", actionTime: Date.now() }];
    this.#model.currentPointer = 0;
    this.#notify();
  }

  isRedoAble() {
    return this.#model.currentPointer < this.#model.history.length - 1;
  }

  isUndoAble() {
    return this.#model.currentPointer > 0;
  }

  setModalState(state, data) {
    this.#model.state.modalState = {
      state,
      data,
    };
    this.#notify();
  }

  activateModal() {
    const modalState = this.#model.state.modalState;
    if (modalState.state === "") {
      return;
    }
    if (modalState.state === "column") {
      this.removeColumn(modalState.data.columnId);
    } else if (modalState.state === "task") {
      this.removeTask(modalState.data.taskId);
    } else if (modalState.state === "history") {
      this.removeAllHistoryLogs();
    }

    this.#model.state.modalState = {
      state: "",
      data: {},
    };
    this.#notify();
  }
}
