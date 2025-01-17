import { CardData } from "../../route/data/cardData.js";
import { Button } from "../Button/button.js";
import Component from "../component.js";

export class EditCard extends Component {

    maxTextLength = 500;

    disabledButtonClassName = "disabled";

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

    disableConfirmButton() {
        const confirmButton = this.current.querySelector(".card-buttons .confirm-button");

        confirmButton.classList.add(this.disabledButtonClassName);
    }

    ableConfirmButton() {
        const confirmButton = this.current.querySelector(".card-buttons .confirm-button");

        confirmButton.classList.remove(this.disabledButtonClassName);
    }

    clearInput() {
        this.title = '';
        this.body = '';
    }

    template() {
        return `
            <div class = "card-text_area">
                <textarea class = "card-title display-bold24" placeholder = "제목을 입력해주세요">${this.title}</textarea>
                <textarea class = "card-body display-medium14" placeholder = "내용을 입력해주세요">${this.body}</textarea>
            </div>
            <div class  = "card-buttons">
                
            </div>
        `;
    }

    addCardData() {
        const component = this.parent.querySelector(`.${this.rootSelectorClassName}`);
        const titleInput = component.querySelector(".card-title");
        const bodyInput = component.querySelector(".card-body");

        let t = '';
        if (titleInput.value.length >= this.maxTextLength) {
            t = titleInput.value.slice(0, 500);
        }
        else {
            t = titleInput.value
        }

        let b = '';
        if (bodyInput.value.length >= this.maxTextLength) {
            b = bodyInput.value.slice(0, 500);
        }
        else {
            b = bodyInput.value
        }

        return new CardData(t, b, "web");

    }

    render(parent) {

        this.children.confirm.object.addEvent("click", this.onConfirm);
        this.children.dismiss.object.addEvent("click", this.onDismiss);

        super.render(parent);

        if (this.cardData) {
            this.current.id = `card${this.cardData.cardId}`;
        }

        const titleInput = this.current.querySelector(".card-title");
        const bodyInput = this.current.querySelector(".card-body");


        this.calculateTextAreaHeight(titleInput);
        this.calculateTextAreaHeight(bodyInput);

        if (bodyInput.value.length == 0 || titleInput.value.length == 0) {
            this.disableConfirmButton();
        }

        titleInput.addEventListener('input', () => {
            if (bodyInput.value.length == 0 || titleInput.value.length == 0) {
                this.disableConfirmButton();
            }
            else {
                this.ableConfirmButton();
            }

            this.calculateTextAreaHeight(titleInput);
        });

        bodyInput.addEventListener('input', () => {
            if (bodyInput.value.length == 0 || titleInput.value.length == 0) {
                this.disableConfirmButton();
            }
            else {
                this.ableConfirmButton();
            }

            this.calculateTextAreaHeight(bodyInput);
        });
    }

    calculateTextAreaHeight(input){
        input.style.height = "auto"; 
        input.style.height = input.scrollHeight + "px"; 
    }

}