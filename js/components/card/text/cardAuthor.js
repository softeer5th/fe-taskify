export const CardViewAuthor = (author) => {
    const cardAuthor = document.createElement("div");
    cardAuthor.className = "display-medium14 card-author";
    cardAuthor.textContent = `author by ${author}`;
    return cardAuthor;
}