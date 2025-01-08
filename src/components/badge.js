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
        <div class="badge-background"> 
            ${this.num}
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