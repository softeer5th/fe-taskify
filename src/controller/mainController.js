import HeaderController from "./headerController.js";
import ColumnController from "./columnController.js";
import TaskController from "./taskController.js";
import HistoryController from "./historyController.js";
import ModalController from "./modalController.js";

export default function MainController(model, rootElement) {
  const controllers = [];
  controllers.push(HeaderController(model, rootElement));
  controllers.push(ColumnController(model, rootElement));
  controllers.push(TaskController(model, rootElement));
  controllers.push(HistoryController(model, rootElement));
  controllers.push(ModalController(model, rootElement));

  function destroy() {
    controllers.forEach((controller) => {
      controller.destroy();
    });
  }

  return {
    destroy,
  };
}
