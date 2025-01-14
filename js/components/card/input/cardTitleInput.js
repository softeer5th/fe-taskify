export const CardTitleInput = ({ title }) => {
    const fragment = document.createDocumentFragment();
    const cardTitleInput = document.createElement("input");
    cardTitleInput.type = "text";
    cardTitleInput.className = "display-bold14 card-title";
    cardTitleInput.placeholder = "제목을 입력하세요";
    cardTitleInput.value = title;
    fragment.appendChild(cardTitleInput)

    return fragment;
}