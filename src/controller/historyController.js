import icons from "../../asset/icon.js";

import Button from "../component/button.js";

import HistoryView from "../view/historyView.js";

export default function HistoryController(model, rootElement) {
  let history = [];

  const user = model.getCurrentData().user;

  const historyView = HistoryView({
    history,
    user,
    onClickHistoryCloseButton: handleClickHistoryCloseButton,
    onClickHistoryDeleteButton: handleClickHistoryDeleteButton,
  });

  rootElement.appendChild(historyView);

  const redoButton = Button({
    className: ["fab", "button-alt"],
    onClick: handleClickRedoButton,
    children: [icons.redo()],
  });
  redoButton.style.right = "48px";
  redoButton.style.bottom = "120px";
  redoButton.addEventListener("click", handleClickRedoButton);

  const undoButton = Button({
    className: ["fab", "button-alt"],
    onClick: handleClickUndoButton,
    children: [icons.undo()],
  });
  undoButton.style.right = "48px";
  undoButton.style.bottom = "192px";
  undoButton.addEventListener("click", handleClickUndoButton);

  rootElement.appendChild(redoButton);
  rootElement.appendChild(undoButton);

  model.addListener(render);

  render();

  // Event Handlers

  function handleClickRedoButton(event) {
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

  function handleClickUndoButton(event) {
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

  function handleClickHistoryCloseButton(event) {
    event.stopPropagation();

    model.toggleHistory();
  }

  function handleClickHistoryDeleteButton(event) {
    event.stopPropagation();

    model.setModalState("history", {});
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
        onClickHistoryCloseButton: handleClickHistoryCloseButton,
        onClickHistoryDeleteButton: handleClickHistoryDeleteButton,
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
