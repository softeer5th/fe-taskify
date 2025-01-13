export const ClosedButton = () => {
    const closedButton = document.createElement("button");
    closedButton.className = "normal-button card-closed-button";
    const closedImg = document.createElement("img");
    closedImg.src = "./assets/icons/normal/closed.svg";
    closedButton.appendChild(closedImg);

    return closedButton;
}