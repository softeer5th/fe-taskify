import HeaderController from "./headerController.js";
import ColumnController from "./columnController.js";
import TaskController from "./taskController.js";
import HistoryController from "./historyController.js";

export default function MainController(model, rootElement) {
  const headerController = HeaderController(model, rootElement);
  const columnController = ColumnController(model, rootElement);
  const taskController = TaskController(model, rootElement);
  const historyController = HistoryController(model, rootElement);

  function destroy() {
    [headerController, columnController, taskController, historyController].forEach((controller) => {
      controller.destroy();
    });
  }

  return {
    destroy,
  };
}
