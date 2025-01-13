export const CardViewContent = (content) => {
    const cardContent = document.createElement("div");
    cardContent.className = "display-medium14 card-content";
    cardContent.textContent = content;
    return cardContent;
}