import { CardData } from "../../route/data/cardData.js";
import { Button } from "../Button/button.js";
import Component from "../component.js";

export class EditCard extends Component {

    children = {
        dismiss: {
            object: new Button("취소", null, "dismiss-button"),
            parentSelector: ".card-buttons"
        },
        confirm: {
            object: new Button("저장", null, "confirm-button"),
            parentSelector: ".card-buttons"
        },
    };

    closeIconRef = "/assets/images/closed.svg";
    editIconRef = "/assets/images/edit.svg";

    title = '';
    body = '';

    constructor(cardData, onConfirm = (newCardData) => { }, onDismiss = () => { }) {
        super();
        super.addRootclass("card");
        super.addRootclass("card-edit");

        console.log("cardData", cardData);
        if (cardData) {
            this.cardData = cardData;
            this.title = cardData.title;
            this.body = cardData.body;
        }

        this.onConfirm = () => {
            const newCardData = this.addCardData();
            onConfirm(newCardData);
        };
        this.onDismiss = onDismiss;
    }

    clearInput() {
        this.title = '';
        this.body = '';
    }

    template() {
        return `
            <div class = "card-text_area">
                <input class = "card-title display-bold24" placeholder = "제목을 입력해주세요" value = "${this.title}"/>
                <input class = "card-body display-medium14" placeholder = "내용을 입력해주세요" value = "${this.body}"/>
            </div>
            <div class  = "card-buttons">
                
            </div>
        `;
    }

    addCardData() {
        const component = this.parent.querySelector(`.${this.rootSelectorClassName}`);
        const titleInput = component.querySelector(".card-title");
        const bodyInput = component.querySelector(".card-body");

        return new CardData(
            titleInput.value,
            bodyInput.value,
            "web"
        );

    }

    render(parent) {

        this.children.confirm.object.addEvent("click", this.onConfirm);
        this.children.dismiss.object.addEvent("click", this.onDismiss);

        super.render(parent);

        if (this.cardData) {
            this.current.id = `card${this.cardData.cardId}`;
        }
    }

}