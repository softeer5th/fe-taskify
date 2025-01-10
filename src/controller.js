import { HeaderView } from "./view/headerView.js";
import { ColumnListView } from "./view/columnListView.js";
import { ColumnView } from "./view/columnView.js";
import { TaskView } from "./view/taskView.js";

function getUserDeviceType() {
  return navigator.userAgentData.mobile ? "mobile" : "web";
}

export function HeaderController(model, rootElement) {
  const headerView = HeaderView({
    onSortButtonClick: handleSortButtonClick,
    onHistoryButtonClick: handleHistoryButtonClick,
  });
  model.addListener(onModelChanged);
  if (rootElement.children.length < 1) {
    rootElement.appendChild(headerView);
  } else if (rootElement.children[0] !== headerView) {
    rootElement.replaceChild(headerView, rootElement.children[0]);
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
  let columns = model.getCurrentDataState().data.column.map((column) => {
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
    // TODO: Implement method when "add column" button is implemented
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
    removedColumns.forEach((column) => {
      column.destroy();
    });
    columns = columns.filter((column) => !removedColumns.some((c) => c.getColumnControllerId() === column.id));
  }
}

function ColumnController(model, columnId, parent) {
  const column = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
  let columnView = ColumnView({
    column: column,
    state: model.getCurrentDataState().state.editingColumnId === column.columnId ? "" : "default",
    onAddButtonClicked: handleTaskAddButtonClick,
    onColumnTitleClicked: handleColumnTitleClick,
    onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
  });
  columnView.addEventListener("mouseenter", handleColumnMouseEnter);
  parent.appendChild(columnView);

  let tasks = [];

  render();

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
    if (columnView.parentElement) {
      columnView.parentElement.removeChild(columnView);
    }
  }

  function handleTaskAddButtonClick(event) {
    event.stopPropagation();
    model.addTask(column.id, "", "", getUserDeviceType());
    console.log("Task Add Button Clicked");
  }

  function handleColumnTitleClick(event) {
    event.stopPropagation();
    console.log("Column Title Clicked");
  }

  function handleColumnDeleteButtonClick(event) {
    event.stopPropagation();
    model.removeColumn(column.id);
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

  function handleTaskDeleteButtonClick(event) {
    event.stopPropagation();
    console.log("Task Delete Button Clicked");
  }

  function handleTaskEditButtonClick(event) {
    event.stopPropagation();
    const taskId = event.currentTarget.parentElement.parentElement.id;
    model.setEditingTaskId(taskId);
    console.log("Task Edit Button Clicked:", taskId);
  }

  function handleTaskEditCancelButtonClick(event) {
    event.stopPropagation();
    model.setEditingTaskId("");
    console.log("Task Edit Cancel Button Clicked");
  }

  function handleTaskEditSaveButtonClick(event) {
    event.stopPropagation();
    const taskElement = event.currentTarget.parentElement.parentElement;
    const taskId = taskElement.id;
    const taskTitle = taskElement.querySelector(".task__content-title").textContent;
    const taskDescription = taskElement.querySelector(".task__content-description").textContent;
    model.editTask(taskId, taskTitle, taskDescription, getUserDeviceType());
    console.log("Task Edit Save Button Clicked");
  }

  function handleTaskClick(event) {
    const taskId = event.currentTarget.id;
    model.setMovingTaskId(taskId);
    console.log("Task Clicked");
  }

  function render() {
    const state = model.getCurrentDataState().state;
    const columnState = state.editingColumnId === columnId ? "editing" : "default";

    const columnOnModel = model.getCurrentDataState().data.column.find((column) => column.id === columnId);
    if (columnState === "editing") {
      const newColumnView = ColumnView({
        column: columnOnModel,
        state: columnState,
        onAddButtonClicked: handleTaskAddButtonClick,
        onColumnTitleClicked: handleColumnTitleClick,
        onColumnDeleteButtonClicked: handleColumnDeleteButtonClick,
      });
      newColumnView.addEventListener("mouseenter", handleColumnMouseEnter);
      parent.replaceChild(newColumnView, columnView);
      columnView = newColumnView;
    }

    const tasksOnModel = model.getCurrentDataState().data.task.filter((task) => task.columnId === columnId);
    const tasks = tasksOnModel.map((task) => {
      const taskState = state.editingTaskId === task.id ? "editing" : "default";
      const taskView = TaskView({
        task: task,
        state: state.editingTaskId === task.id ? "editing" : "default",
        onFirstButtonClicked: handleTaskEditCancelButtonClick,
        onSecondButtonClicked: handleTaskEditSaveButtonClick,
      });
      taskView.addEventListener("click", handleTaskClick);
      return taskView;
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
