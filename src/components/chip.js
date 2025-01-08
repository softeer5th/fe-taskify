import Component from "./component.js";

export class Chip extends Component {

    children = {

    };

    events = [];

    sortIconRef = "/assets/images/arrowBoth.svg"
    constructor(sort) {
        super();
        this.currentSort = sort;
    }

    template() {

        return `
        <div class="chip">
            <img src=${this.sortIconRef} alt="icon" class="chip-icon" />
            <div class = "chip-text">
                ${this.currentSort}
            </div>
        </div >
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