export const EditButton = () => {
    const editButton = document.createElement("button");
    editButton.className = "normal-button card-edit-button";
    const editImg = document.createElement("img");
    editImg.src = "./assets/icons/normal/edit.svg";
    editButton.appendChild(editImg);

    return editButton;
}