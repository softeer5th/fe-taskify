function Data() {
  let columns = [];
  let tasks = [];
  let user = null;

  function addColumn(newColumn) {
    columns.push(newColumn);
  }

  function removeColumn(columnId) {
    columns = columns.filter((column) => column.id !== columnId);
  }

  function getColumns() {
    return columns;
  }

  function addTask(newTask) {
    tasks.push(newTask);
  }

  function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  function updateTask(taskId, newTask) {
    tasks = tasks.map((task) => (task.id === taskId ? newTask : task));
  }

  function getTasks() {
    return tasks;
  }

  function setUser(newUser) {
    user = newUser;
  }

  function getUser() {
    return user;
  }

  return {
    addColumn,
    removeColumn,
    getColumns,
    addTask,
    removeTask,
    updateTask,
    getTasks,
    setUser,
    getUser,
  };
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function Model() {
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
      order: "asc",
      isHistoryOpen: false,
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
    };
    model.history.push(newHistory);
    model.currentPointer += 1;
    notify();
  }

  // Public method

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
  }

  function removeColumn(columnId) {
    const data = getCurrentData();
    const removedColumn = data.column.find((column) => column.id === columnId);
    data.column = data.column.filter((column) => column.id !== columnId);
    data.task = data.task.filter((task) => task.columnId !== columnId);
    pushHistory(data, { type: "removeColumn", removedColumnName: removedColumn.title });
  }

  function getColumn(columnId) {
    const data = getCurrentData();
    return data.column.find((column) => column.id === columnId);
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
  }

  function DEBUG_getCurrentData() {
    return { data: getCurrentData(), state: deepCopy(model.state) };
  }

  return {
    init: initHistory,
    addListener,
    removeListener,
    undo,
    redo,
    addColumn,
    removeColumn,
    getColumn,
    addTask,

    // For debugging
    DEBUG_getCurrentData,
  };
}
