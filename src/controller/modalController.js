import ModalView from "../view/modalView.js";

export default function ModalController(model, rootElement) {
  model.addListener(render);

  function destroy() {
    model.removeListener(render);
  }

  // Event Handlers

  function onClickModalCloseButton() {
    model.setModalState("", {});
  }

  function onClickModalActiveButton() {
    model.activateModal();
  }

  function render() {
    // Get the current modal state from the model
    const modalState = model.getCurrentState().modalState;

    // Get the current modal view from the root element
    const modalView = rootElement.querySelector(".modal__background");

    // If the modal state is empty, remove the modal view
    if (modalState.state === "") {
      modalView?.remove();
      return;
    }

    // Create a new modal view
    const modalText = modalState.state === "column" ? "선택한 열을 삭제할까요?" : modalState.state === "task" ? "선택한 카드를 삭제할까요?" : "모든 사용자 기록을 삭제할까요?";
    const closeText = "취소";
    const activeText = "삭제";
    const newModalView = ModalView({ modalText, closeText, activeText, onClickModalCloseButton, onClickModalActiveButton });
    newModalView.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClickModalCloseButton();
      }
    });
    if (modalView) {
      modalView.replaceWith(newModalView);
    } else {
      rootElement.appendChild(newModalView);
    }
    newModalView.focus();
  }

  return {
    destroy,
  };
}
