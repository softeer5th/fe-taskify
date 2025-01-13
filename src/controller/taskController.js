import TaskView from "../view/taskView.js";

export default function TaskController(model, rootElement) {
  let tasks = model.getCurrentTaskData();

  model.addListener(onModelChanged);

  function onModelChanged() {
    tasks = model.getCurrentTaskData();
    render();
  }

  function render() {}
}
