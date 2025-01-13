import Component from "../component.js";

export class Button extends Component {

    constructor(text = '', iconRef, buttonType = "confirm-button" ) {
        super();
        super.addRootclass(buttonType);
        super.addRootclass("button-background");
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

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}