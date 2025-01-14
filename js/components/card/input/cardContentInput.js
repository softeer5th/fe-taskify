export const CardContentInput = ({ content, onChangeInput }) => {
    const fragment = document.createDocumentFragment();
    const cardContentTextarea = document.createElement("textarea");
    cardContentTextarea.rows = "1";
    cardContentTextarea.className = "display-medium14 card-content";
    cardContentTextarea.placeholder = "내용을 입력하세요";
    cardContentTextarea.required = true;
    cardContentTextarea.value = content;
    fragment.appendChild(cardContentTextarea)
    return fragment;
}