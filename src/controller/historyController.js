import icons from "../../public/icon.js";
import Button from "../component/button.js";

import HistoryView from "../view/historyView.js";

export default function HistoryController(model, rootElement) {
  let history = [];

  const user = model.getCurrentData().user;

  const historyView = HistoryView({
    history,
    user,
    onHistoryCloseButtonClicked: handleHistoryCloseButtonClicked,
    onHistoryDeleteButtonClicked: handleHistoryDeleteButtonClicked,
  });

  rootElement.appendChild(historyView);

  const redoButton = Button({
    className: ["fab", "button-alt"],
    onClick: handleRedoButtonClicked,
    children: [icons.redo()],
  });
  redoButton.style.right = "48px";
  redoButton.style.bottom = "120px";
  redoButton.addEventListener("click", handleRedoButtonClicked);

  const undoButton = Button({
    className: ["fab", "button-alt"],
    onClick: handleUndoButtonClicked,
    children: [icons.undo()],
  });
  undoButton.style.right = "48px";
  undoButton.style.bottom = "192px";
  undoButton.addEventListener("click", handleUndoButtonClicked);

  rootElement.appendChild(redoButton);
  rootElement.appendChild(undoButton);

  model.addListener(onModelChanged);

  render();

  // Event Handlers

  function handleRedoButtonClicked(event) {
    event.stopPropagation();

    if (!model.isRedoAble()) {
      redoButton.animate([{ transform: "translateX(0px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0px)" }], {
        duration: 150,
        iterations: 2,
      });
      return;
    }

    model.redo();
  }

  function handleUndoButtonClicked(event) {
    event.stopPropagation();

    if (!model.isUndoAble()) {
      undoButton.animate([{ transform: "translateX(0px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0px)" }], {
        duration: 150,
        iterations: 2,
      });
      return;
    }

    model.undo();
  }

  function handleHistoryCloseButtonClicked(event) {
    event.stopPropagation();

    model.toggleHistory();
  }

  function handleHistoryDeleteButtonClicked(event) {
    event.stopPropagation();

    model.setModalState("history", {});
  }

  // Model Event Handlers

  function onModelChanged() {
    render();
  }

  // Render

  function render() {
    const history = model.getAllHistoryLogs();
    const historyView = document.querySelector(".history");
    const user = model.getCurrentData().user;
    const state = model.getCurrentState();

    if (state.isHistoryOpen) {
      const newHistoryView = HistoryView({
        history,
        user,
        onHistoryCloseButtonClicked: handleHistoryCloseButtonClicked,
        onHistoryDeleteButtonClicked: handleHistoryDeleteButtonClicked,
      });
      historyView.querySelector(".history__list").replaceWith(newHistoryView.querySelector(".history__list"));
      if (!historyView.classList.contains("history--show")) {
        historyView.classList.add("history--show");
      }
    } else {
      if (historyView.classList.contains("history--show")) {
        historyView.classList.remove("history--show");
      }
    }
  }
}
