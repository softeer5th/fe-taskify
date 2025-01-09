import { Badge } from "../../../components/badge.js";
import { IconButton } from "../../../components/Button/iconButton.js";
import { Chip } from "../../../components/chip.js";
import Component from "../../../components/component.js";
import { Logo } from "./logo.js";


export class Header extends Component {

    children = {
        // button: {
        //     object: new IconButton("/assets/images/plus.svg",),
        //     parentSelector: `#${this.rootId}`,
        // },
        badge: {
            object: new Badge(4400),
            parentSelector: `#${this.rootId}`,
        },
        // chip: {
        //     object: new Chip("최신순"),
        //     parentSelector: `#${this.rootId}`,
        // },
        logo: {
            object: new Logo(),
            parentSelector: `#${this.rootId}`,
        }
    };

    events = [];

    constructor() {
        super();
    }

    template() {
        return `
            <div id = "${this.rootId}" class = "div">  <span> text!!! </span> </div>
        `;
    }

    render(parent) {
        // this.children.button.object.addEvent("click", () => {
        //     console.log("button click!!");
        // });

        this.children.badge.object.addEvent("click", () => {
            console.log("click!!");
        });
        super.render(parent);

    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}