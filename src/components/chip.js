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
        <div id = "${this.rootId}" class="chip">
            <img src=${this.sortIconRef} alt="icon" class="chip-icon" />
            <div class = "chip-text">
                ${this.currentSort}
            </div>
        </div >
        `;
    }

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}