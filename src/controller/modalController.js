import Model from "../model.js";

import ModalView from "../view/modalView.js";

export default function ModalController(model = new Model(), rootElement = document.querySelector("#root")) {
  model.addListener(render);

  function destroy() {
    model.removeListener(render);
  }

  function onClickModalCloseButton() {
    model.setModalState("", {});
  }

  function onClickModalActiveButton() {
    model.activateModal();
  }

  function render() {
    const modalState = model.getCurrentState().modalState;
    const modalView = rootElement.querySelector(".modal__background");

    if (modalState.state === "") {
      modalView?.remove();
      return;
    }

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
