import Model from "../model.js";

import TaskView from "../view/taskView.js";

export default function TaskController(model = new Model(), rootElement = document.getElementById("root")) {
  let tasks = [];
  // let taskViews: HTMLDivElement[] = [];
  let taskViews = [];
  let ghostTaskView = TaskView({
    task: { id: 0, columnId: 0, title: "", description: "", createdAt: 0 },
    state: "default",
    onFirstButtonClicked: () => {},
    onSecondButtonClicked: () => {},
  });
  ghostTaskView.classList.add("task--ghost");
  rootElement.appendChild(ghostTaskView);

  let addingTaskView = TaskView({
    task: { id: 0, columnId: 0, title: "", description: "", createdAt: 0 },
    state: "editing",
    onFirstButtonClicked: handleTaskEditCancelButtonClicked,
    onSecondButtonClicked: handleTaskEditSaveButtonClicked,
  });

  model.addListener(onModelChanged);

  render();

  function handleTaskDeleteButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    console.log("Delete task with id: ", taskId);
  }

  function handleTaskEditButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    console.log("Edit task with id: ", taskId);
  }

  function handleTaskEditCancelButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    console.log("Edit task with id: ", taskId);
  }

  function handleTaskEditSaveButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskId = +event.target.closest(".task").id;

    console.log("Edit task with id: ", taskId);
  }

  function onModelChanged() {
    render();
  }

  function destroy() {
    model.removeListener(onModelChanged);
  }

  function render() {
    const columnViews = [...rootElement.querySelectorAll(".column")];

    const tasksOnModel = model.getCurrentTaskData();
    const state = model.getCurrentState();

    // Handle removed tasks
    const removedTasks = tasks.filter((task) => !tasksOnModel.some((t) => t.id === task.id));
    removedTasks.forEach((task) => {
      const taskView = taskViews.find((t) => +t.id === task.id);
      taskView.remove();
    });
    taskViews = taskViews.filter((taskView) => tasksOnModel.some((task) => task.id === +taskView.id));
    tasks = tasks.filter((task) => tasksOnModel.some((t) => t.id === task.id));

    // Handle added tasks
    const addedTasks = tasksOnModel.filter((task) => !taskViews.some((t) => t.id === task.id));
    addedTasks.forEach((task) => {
      const newTaskView = TaskView({
        task: task,
        state: "default",
        onFirstButtonClicked: handleTaskDeleteButtonClicked,
        onSecondButtonClicked: handleTaskEditButtonClicked,
      });
      taskViews.push(newTaskView);
    });

    // Handle updated tasks
    tasksOnModel.forEach((task) => {
      const prevTask = tasks.find((t) => t.id === task.id);
      if (JSON.stringify(task) !== JSON.stringify(prevTask)) {
        const taskView = taskViews.find((t) => +t.id === task.id);
        const newTaskView = TaskView({
          task: task,
          state: "default",
          onFirstButtonClicked: handleTaskDeleteButtonClicked,
          onSecondButtonClicked: handleTaskEditButtonClicked,
        });
        taskView.replaceWith(newTaskView);
      }
    });

    // Sort tasksOnModel by createdAt with order state
    const orderState = state.order;
    if (orderState === "latest") {
      tasksOnModel.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      tasksOnModel.sort((a, b) => a.createdAt - b.createdAt);
    }

    // Create Adding TaskView when state.editingTask is 0 and state.addingColumn is not -1
    const isAddingTask = state.editingColumnId !== -1 && state.editingTaskId === 0;
    if (isAddingTask) {
      const columnView = columnViews.find((c) => +c.id === state.editingColumnId);
      addingTaskView.innerHTML = TaskView({
        task: { id: 0, columnId: state.editingColumnId, title: "", description: "", createdAt: 0 },
        state: "editing",
        onFirstButtonClicked: handleTaskEditCancelButtonClicked,
        onSecondButtonClicked: handleTaskEditSaveButtonClicked,
      }).innerHTML;
      addingTaskView.style.order = -1;
      columnView.querySelector(".column__task-list").appendChild(addingTaskView);
    }

    // Relocate tasks
    tasksOnModel.forEach((task, index) => {
      const taskView = taskViews.find((t) => +t.id === task.id);
      const columnView = columnViews.find((c) => +c.id === task.columnId);
      taskView.style.order = index;
      columnView.querySelector(".column__task-list").appendChild(taskView);
    });

    tasks = tasksOnModel;
  }

  return {
    destroy,
  };
}
