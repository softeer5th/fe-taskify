import Component from "../component.js";

export class Button extends Component {

    constructor(text = '', iconRef, buttonType = "confirm-button" ) {
        super();
        this.addRootclass(buttonType);
        this.addRootclass("button-background");

        this.iconRef = iconRef;
        this.text = text;
        this.buttonType = buttonType;
    }

    template() {

        let iconTemplate = '';
        if (this.iconRef) {
            iconTemplate = `<img src=${this.iconRef} alt="icon" class="button-icon" />`;
        }

        return `
            ${iconTemplate}
            <div class = "button-text">
                ${this.text}
            </div>
        `;
    }

}