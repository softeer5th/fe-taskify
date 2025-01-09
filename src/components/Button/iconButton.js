import Component from "../component.js";

export class IconButton extends Component {

    children = {

    };

    events = [];

    constructor(iconRef, buttonType = "confirm-button") {
        super();
        this.iconRef = iconRef;
        this.buttonType = buttonType;
    }

    template() {

        let buttonStyle = this.buttonType;

        let iconTemplate = '';
        if (this.iconRef) {
            iconTemplate = `<img src=${this.iconRef} alt="icon" class="button-icon" />`;
        }

        buttonStyle += ' button-background';

        return `
        <div id = "${this.rootId}" class="${buttonStyle}"> 
            ${iconTemplate}
        </div>
    `;
    }

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent( listenerName, callback );

    }

}