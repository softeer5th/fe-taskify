import Component from "./component.js";

export class Badge extends Component {

    children = {

    };

    events = [];

    constructor(num) {
        super();
        if(num > 99){
            this.num = "99+";
        }
        else{
            this.num = num;
        }
    }

    template() {

        return `
            <div id = "${this.rootId}" class="badge"> 
                ${this.num}
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