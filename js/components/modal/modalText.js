export const ModalText = (text) => {
    const modalText = document.createElement("div");
    modalText.className = "display-medium-16 modal-text";
    modalText.textContent = text;
    return modalText;
}