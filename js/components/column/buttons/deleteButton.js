export const deleteButton = () => {
    const deleteButton = document.createElement("button");
    deleteButton.className = "column-header-content-delete-button normal-button";
    const deleteImg = document.createElement("img");
    deleteImg.src = "./assets/icons/normal/closed.svg";
    deleteButton.appendChild(deleteImg);
    return deleteButton;
}