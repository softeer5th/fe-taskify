export const ModalCancelButton = (setState) => {
    const modalCancelButton = document.createElement("button");
    modalCancelButton.className = "modal-cancel-button display-bold14";
    modalCancelButton.textContent = "취소";
    modalCancelButton.addEventListener("click", () => { setState({ modalVisible: false }) });
    return modalCancelButton;
}