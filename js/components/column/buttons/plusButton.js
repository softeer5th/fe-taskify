export const plusButton = (id, onAddCard) => {
    const plusButton = document.createElement("button");
    plusButton.className = "column-header-plus-button normal-button";
    const plusImg = document.createElement("img");
    plusImg.src = "./assets/icons/normal/plus.svg";
    plusButton.appendChild(plusImg);
    plusButton.addEventListener("click", () => onAddCard(id));
    return plusButton;
}