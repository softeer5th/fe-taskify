import Component from "../component.js";

export class IconButton extends Component {

    constructor(iconRef, buttonType = "confirm-button") {
        super();
        this.addRootclass(buttonType);
        this.addRootclass("button-background");
        this.iconRef = iconRef;
        this.buttonType = buttonType;
    }

    template() {

        let iconTemplate = '';
        if (this.iconRef) {
            iconTemplate = `<img src=${this.iconRef} alt="icon" class="button-icon" />`;
        }

        return `
            ${iconTemplate}
        `;
    }

}