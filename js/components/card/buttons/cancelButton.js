export const CancelButton = () => {
    const cancelButton = document.createElement("button");
    cancelButton.className = "display-bold14 card-button-cancel";
    cancelButton.textContent = "취소";
    return cancelButton;
}