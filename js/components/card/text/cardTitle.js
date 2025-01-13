export const CardViewTitle = (title) => {
    const cardTitle = document.createElement("div");
    cardTitle.className = "display-bold14 card-title";
    cardTitle.textContent = title;

    return cardTitle;
}