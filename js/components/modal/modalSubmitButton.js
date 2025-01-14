export const ModalSubmitButton = (onDelete) => {
    const modalSubmitButton = document.createElement("button");
    modalSubmitButton.className = "modal-submit-button display-bold14";
    modalSubmitButton.textContent = "삭제";
    modalSubmitButton.addEventListener("click", () => onDelete());
    return modalSubmitButton;
}