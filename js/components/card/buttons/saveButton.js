export const SaveButton = () => {
    const submitButton = document.createElement("button");
    submitButton.className = "display-bold14 card-button-submit";
    submitButton.textContent = "등록";
    submitButton.disabled = true;

    return submitButton;
}