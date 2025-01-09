import Component from "../component.js";

export class Button extends Component {

    children = {

    };

    events = [];

    constructor(text = '', iconRef, buttonType = "confirm-button") {
        super();
        this.iconRef = iconRef;
        this.text = text;
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
            <div class = "button-text">
               ${this.text}
            </div>
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
            this.template.addEventListener(listenerName, callback);
        });
    }

    addEvent(listenerName, callback) {
        this.events.push({ listenerName, callback });

    }

}