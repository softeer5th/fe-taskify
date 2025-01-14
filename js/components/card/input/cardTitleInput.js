import { createComponent } from "../../../global/createComponent.js";

export const CardTitleInput = ({ title, onChangeInput }) => {

    return createComponent({
        initialState: {
            focus: false,
        },
        render: ({ state, setState }) => {
            const fragment = document.createDocumentFragment();
            const cardTitleInput = document.createElement("input");
            cardTitleInput.type = "text";
            cardTitleInput.className = "display-bold14 card-title";
            cardTitleInput.placeholder = "제목을 입력하세요";
            cardTitleInput.value = title;

            cardTitleInput.addEventListener("input", (event) => {
                if (typeof onChangeInput === "function") {
                    onChangeInput(event.target.value);
                }
            });

            //cardTitleInput.addEventListener("focus", () => setState({ ...state, focus: true }));
            fragment.appendChild(cardTitleInput)

            return fragment;
        }
    })

}