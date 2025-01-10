// DTO: Data Type Object
// Not used, just for reference
/*
{
  column: [{
    id: Number,
    title: string,
  }];

  task: [{
    id: Number,
    name: string,
    description: string,
    createdAt: Number,
    device: string,
    columnId: Number,
  }];

  user: {
    name: string,
    thumbnailUrl: string,
  };
}
*/

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function Model() {
  let model = {
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
  let listeners = [];

  // Private method

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function getCurrentData() {
    const currentHistory = model.history[model.currentPointer];
    const currentData = currentHistory.data;
    return deepCopy(currentData);
  }

  function pushHistory(newData, action) {
    const newHistory = {
      data: newData,
      action,
      actionTime: Date.now(),
    };
    model.history.push(newHistory);
    model.currentPointer += 1;
    notify();
  }

  // Public method

  function setInitData(data) {
    model.history[model.history.length - 1].data = data;
    notify();
  }

  function setEditingTaskId(taskId) {
    model.state.editingTaskId = taskId;
    notify();
  }

  function setEditingColumnId(columnId) {
    model.state.editingColumnId = columnId;
    notify();
  }

  function setMovingTaskId(taskId) {
    model.state.movingTaskId = taskId;
    notify();
  }

  function toggleOrder() {
    model.state.order = model.state.order === "latest" ? "oldest" : "latest";
    notify();
  }

  function toggleHistory() {
    model.state.isHistoryOpen = !model.state.isHistoryOpen;
    notify();
  }

  function setMouseOverColumnId(columnId) {
    model.state.mouseOverColumnId = columnId;
    notify();
  }

  function addListener(listener) {
    listeners.push(listener);
  }

  function removeListener(listener) {
    listeners = listeners.filter((l) => l !== listener);
  }

  function initHistory(history) {
    model.history = history;
    notify();
  }

  function undo() {
    if (model.currentPointer > 1) {
      model.currentPointer -= 1;
      notify();
    }
  }

  function redo() {
    if (model.currentPointer < model.history.length - 1) {
      model.currentPointer += 1;
      notify();
    }
  }

  function addColumn(addedColumnName) {
    const data = getCurrentData();
    data.column.push({
      id: Date.now(), // TODO: Use UUID or other unique id instead
      title: addedColumnName,
    });
    pushHistory(data, { type: "addColumn", addedColumnName: addedColumnName });
    notify();
  }

  function removeColumn(columnId) {
    const data = getCurrentData();
    const removedColumn = data.column.find((column) => column.id === columnId);
    data.column = data.column.filter((column) => column.id !== columnId);
    data.task = data.task.filter((task) => task.columnId !== columnId);
    pushHistory(data, { type: "removeColumn", removedColumnName: removedColumn.title });
    notify();
  }

  function addTask(columnId, addedTaskName, addedTaskDescription, addedTaskDevice) {
    const data = getCurrentData();
    const addedTask = {
      id: Date.now(), // TODO: Use UUID or other unique id instead
      name: addedTaskName,
      description: addedTaskDescription,
      createdAt: Date.now(),
      device: addedTaskDevice,
      columnId,
    };
    data.task.push(addedTask);
    pushHistory(data, { type: "addTask", addedTask: addedTask });
    notify();
  }

  function removeTask(taskId) {
    const data = getCurrentData();
    const removedTask = data.task.find((task) => task.id === taskId);
    data.task = data.task.filter((task) => task.id !== taskId);
    pushHistory(data, { type: "removeTask", removedTaskName: removedTask.name });
    notify();
  }

  function editTask(taskId, updatedTaskName, updatedTaskDescription, updatedTaskDevice) {
    const data = getCurrentData();
    const updatedTask = data.task.find((task) => task.id === taskId);
    updatedTask.name = updatedTaskName;
    updatedTask.description = updatedTaskDescription;
    updatedTask.device = updatedTaskDevice;
    pushHistory(data, { type: "updateTask", updatedTask: updatedTask });
    notify();
  }

  function moveTask(taskId, destinationColumnId) {
    const data = getCurrentData();
    const movedTask = data.task.find((task) => task.id === taskId);
    movedTask.columnId = destinationColumnId;
    pushHistory(data, { type: "moveTask", movedTask: movedTask, sourceColumnId: movedTask.columnId, destinationColumnId: destinationColumnId });
    notify();
  }

  function getCurrentDataState() {
    return { data: getCurrentData(), state: deepCopy(model.state) };
  }

  return {
    setInitData,
    init: initHistory,
    addListener,
    removeListener,
    undo,
    redo,
    setEditingTaskId,
    setEditingColumnId,
    setMovingTaskId,
    toggleOrder,
    toggleHistory,
    setMouseOverColumnId,
    addColumn,
    removeColumn,
    addTask,
    removeTask,
    editTask,
    moveTask,
    getCurrentDataState,
  };
}
