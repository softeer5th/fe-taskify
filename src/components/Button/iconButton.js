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
        <div class="${buttonStyle}"> 
            ${iconTemplate}
        </div>
    `;
    }

    render(parent) {

        parent.innerHTML += this.template();

        for (const key in this.children) {
            const childParent = document.querySelector(this.children[key].parentSelector);
            this.children[key].object.render(childParent);
        }

        this.events.forEach(({ listenerName, callback }) => {
            parent.addEventListener(listenerName, callback);
        });
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });

    }

}