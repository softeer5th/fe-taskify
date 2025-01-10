import { HeaderView } from "./view/headerView.js";
import { ColumnListView } from "./view/columnListView.js";
import { ColumnView } from "./view/columnView.js";
import { TaskView } from "./view/taskView.js";

export function HeaderController(model, rootElement) {
  const header = HeaderView({
    onSortButtonClick: handleSortButtonClick,
    onHistoryButtonClick: handleHistoryButtonClick,
  });
  model.addListener(onModelChanged);
  if (rootElement.children.length < 1) {
    rootElement.appendChild(header);
  } else if (rootElement.children[0] !== header) {
    rootElement.replaceChild(header, rootElement.children[0]);
  }
  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleSortButtonClick(event) {
    event.stopPropagation();
    model.toggleOrder();
    console.log("Sort Button Clicked");
  }

  function handleHistoryButtonClick(event) {
    event.stopPropagation();
    model.toggleHistory();
    console.log("History Button Clicked");
  }

  function render() {}
}

export function ColumnListController(model, rootElement) {
  const columnListView = ColumnListView();
  const columns = model.getCurrentDataState().data.column.map((column) => {
    return ColumnController(model, column.id, columnListView);
  });
  if (rootElement.children.length < 2) {
    rootElement.appendChild(columnListView);
  } else if (rootElement.children[1] !== columnListView) {
    rootElement.replaceChild(columnListView, rootElement.children[1]);
  }
  model.addListener(onModelChanged);

  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleAddColumnButtonClick(event) {
    event.stopPropagation();
    model.addColumn("New Column");
  }

  function render() {
    const modelData = model.getCurrentDataState();
    const columnsOfModel = modelData.data.column;
    const state = modelData.state;

    // Add columns
    const addedColumns = columnsOfModel.filter((column) => !columns.some((c) => c.getColumnControllerId() === column.id));
    addedColumns.forEach((column) => {
      const columnController = ColumnController(model, column.id, columnListView);
      columns.push(columnController);
    });

    // Remove columns
    const removedColumns = columns.filter((column) => columns.some((c) => c.getColumnControllerId() === column.id));
    columns.forEach((column) => {
      column.destroy();
    });
  }
}

function ColumnController(model, columnId, element) {
  const column = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
  let columnView = ColumnView({
    column: column,
    state: model.getCurrentDataState().state.editingColumnId === column.columnId ? "" : "default",
    onAddButtonClicked: handleTaskAddButtonClick,
    onColumnTitleClicked: handleColumnTitleClick,
    onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
  });
  columnView.addEventListener("mouseenter", handleColumnMouseEnter);
  element.appendChild(columnView);

  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleTaskAddButtonClick(event) {
    event.stopPropagation();
    console.log("Task Add Button Clicked");
  }

  function handleColumnTitleClick(event) {
    event.stopPropagation();
    console.log("Column Title Clicked");
  }

  function handleColumnDeleteButtonClick(event) {
    event.stopPropagation();
    console.log("Column Delete Button Clicked");
  }

  function handleColumnMouseEnter(event) {
    event.stopPropagation();
    const currentMouseOverColumnId = model.getCurrentDataState().state.mouseOverColumnId;
    if (currentMouseOverColumnId !== columnId) {
      model.setMouseOverColumnId(columnId);
    }
    console.log("Column Mouse Enter");
  }

  function render() {
    const state = model.getCurrentDataState().state;
    const columnState = state.editingColumnId === columnId ? "editing" : "default";

    if (columnState === "editing") {
      const columnOnModel = model.getCurrentDataState().data.column.find((column) => column.id === columnId);

      const newColumnView = ColumnView({
        column: columnOnModel,
        state: columnState,
        onAddButtonClicked: handleTaskAddButtonClick,
        onColumnTitleClicked: handleColumnTitleClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
      });
      newColumnView.addEventListener("mouseenter", handleColumnMouseEnter);
      element.replaceChild(newColumnView, columnView);
      columnView = newColumnView;
    }

    const tasksOnModel = model.getCurrentDataState().data.task.filter((task) => task.columnId === columnId);
    const tasks = tasksOnModel.map((task) => {
      return TaskController(model, task.id, columnView);
    });
  }

  function getColumnControllerId() {
    return columnId;
  }

  return {
    destroy,
    getColumnControllerId,
  };
}

function TaskController(model, taskId, element) {
  const task = model.getCurrentDataState().data.task.find((task) => task.id === taskId);
  let taskView = TaskView({
    task: task,
    state: model.getCurrentDataState().state.movingTaskId === taskId ? "moving" : "default",
    onFirstButtonClicked: handleTaskDeleteButtonClick,
    onSecondButtonClicked: handleTaskEditButtonClick,
  });
  taskView.addEventListener("mousedown", handleTaskClick);
  element.appendChild(taskView);
  model.addListener(onModelChanged);
  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function handleTaskDeleteButtonClick(event) {
    event.stopPropagation();
    console.log("Task Delete Button Clicked");
  }

  function handleTaskEditButtonClick(event) {
    event.stopPropagation();
    console.log("Task Edit Button Clicked");
  }

  function handleTaskEditCancelButtonClick(event) {
    event.stopPropagation();
    console.log("Task Edit Cancel Button Clicked");
  }

  function handleTaskEditSaveButtonClick(event) {
    event.stopPropagation();
    console.log("Task Edit Save Button Clicked");
  }

  function handleTaskClick(event) {
    model.setMovingTaskId(taskId);
    console.log("Task Clicked");
  }

  function render() {
    const state = model.getCurrentDataState().state;
    const taskState = state.editingTaskId === taskId ? "editing" : state.movingTaskId === taskId ? "moving" : "default";

    const taskOnModel = model.getCurrentDataState().data.task.find((task) => task.id === taskId);

    const newTaskView = TaskView({
      task: taskOnModel,
      state: taskState,
      onFirstButtonClicked: taskState === "editing" ? handleTaskEditCancelButtonClick : handleTaskDeleteButtonClick,
      onSecondButtonClicked: taskState === "editing" ? handleTaskEditSaveButtonClick : handleTaskEditButtonClick,
    });
    newTaskView.addEventListener("mousedown", handleTaskClick);
    element.replaceChild(newTaskView, taskView);
    taskView = newTaskView;
  }

  function getTaskControllerId() {
    return taskId;
  }

  return {
    destroy,
    getTaskControllerId,
  };
}
