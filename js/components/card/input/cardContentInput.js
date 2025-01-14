export const CardContentInput = ({ content, onChangeInput }) => {
    const cardContentTextarea = document.createElement("textarea");
    cardContentTextarea.rows = "1";
    cardContentTextarea.className = "display-medium14 card-content";
    cardContentTextarea.placeholder = "내용을 입력하세요";
    cardContentTextarea.required = true;
    cardContentTextarea.textarea = content;

    cardContentTextarea.addEventListener("input", (event) => {
        if (typeof onChangeInput === "function") {
            onChangeInput(event.target.textarea);
        }
    });
    return cardContentTextarea;
}