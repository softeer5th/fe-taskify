import Component from "../component.js";

export class IconButton extends Component {

    children = {

    };

    events = [];

    constructor(iconRef, buttonType = "confirm-button") {
        super();
        super.addRootclass(buttonType);
        super.addRootclass("button-background");
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

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}