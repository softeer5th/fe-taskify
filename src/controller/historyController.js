import Model from "../model.js";

import HistoryView from "../view/historyView.js";
import Fab from "../component/fab.js";

export default function HistoryController(model = new Model(), rootElement = document.getElementById("root")) {
  let history = [];

  const user = model.getCurrentData().user;

  const historyView = HistoryView({
    history,
    user,
    onHistoryCloseButtonClicked: handleHistoryCloseButtonClicked,
    onHistoryRemoveButtonClicked: handleHistoryRemoveButtonClicked,
  });

  rootElement.appendChild(historyView);

  const redoButton = Fab({ icon: "redo", color: "default", onButtonClick: handleRedoButtonClicked });
  redoButton.style.right = "48px";
  redoButton.style.bottom = "120px";

  const undoButton = Fab({ icon: "undo", color: "default", onButtonClick: handleUndoButtonClicked });
  undoButton.style.right = "48px";
  undoButton.style.bottom = "192px";

  rootElement.appendChild(redoButton);
  rootElement.appendChild(undoButton);

  model.addListener(onModelChanged);

  render();

  // Event Handlers

  function handleRedoButtonClicked() {
    console.log("Redo Button Clicked");
  }

  function handleUndoButtonClicked() {
    console.log("Undo Button Clicked");
  }

  function handleHistoryCloseButtonClicked() {
    console.log("History Close Button Clicked");
  }

  function handleHistoryRemoveButtonClicked() {
    console.log("History Remove Button Clicked");
  }

  // Model Event Handlers

  function onModelChanged() {
    render();
  }

  // Render

  function render() {}
}
