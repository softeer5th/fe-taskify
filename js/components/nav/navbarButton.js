export const navbarButton = () => {
    const button = document.createElement("button");
    button.className = "nav-bar-history-button"
    const img = document.createElement("img");
    img.src = "./assets/icons/normal/history.svg";

    
    button.appendChild(img);
    return button;
}