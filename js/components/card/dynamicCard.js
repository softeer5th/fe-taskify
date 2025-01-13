import { createComponent } from "../../global/createComponent.js";
import { CardDynamicButtons } from "./buttons/cardDynamicButtons.js";
import { CardContentInput } from "./input/cardContentInput.js";
import { CardTitleInput } from "./input/cardTitleInput.js";

export const DynamicCard = (card, columnId) => {

    return createComponent({
        initialState: {
            title: "a",
            content: "a",
        },
        render: ({ state, setState }) => {
            console.log(state)
            const { id } = card;

            const { title, content } = state;

            const fragment = document.createDocumentFragment();

            const cardFormContainer = document.createElement("li");
            cardFormContainer.className = "card-template";

            cardFormContainer.appendChild(CardTitleInput({
                title,
                onChangeInput: (newTitle) => {
                    setState({ ...state, title: newTitle })
                }
            }));

            cardFormContainer.appendChild(CardContentInput({
                content,
                onChangeInput: (newContent) => {
                    setState({ ...state, content: newContent })
                }
            }));

            cardFormContainer.appendChild(CardDynamicButtons(id, columnId));
            fragment.appendChild(cardFormContainer);
            return fragment;
        }
    })


}