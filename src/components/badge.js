import Component from "./component.js";

export class Badge extends Component {

    maxDisplayNumber = 99;

    constructor(num) {
        super();
        if (num > this.maxDisplayNumber) {
            this.num = "99+";
        }
        else {
            this.num = num;
        }
    }

    template() {

        return `
            <div class="badge"> 
                ${this.num}
            </div>
         `;
    }

}