import Component from "./component.js";

export class Chip extends Component {

    sortIconRef = "/assets/images/arrowBoth.svg";

    constructor(sort) {
        super();
        this.addRootclass("chip");

        this.currentSort = sort;
    }

    template() {
        return `
            <img src=${this.sortIconRef} alt="icon" class="chip-icon" />
            <div class = "chip-text display-medium12">
                ${this.currentSort}
            </div>
        `;
    }

}