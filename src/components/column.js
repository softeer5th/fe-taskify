import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";
import { DefaultCard } from "./Card/card.js";
import { ColumnHeader } from "./columnHeader.js";

export class Column extends Component {

    events = [];

    constructor(columnData) {
        super();
        super.addRootclass("column");

        this.children = {
            header: {
                object: new ColumnHeader(columnData.name, columnData.data.length),
                parentSelector: `.column`
            }
        };
    
        columnData.data.forEach((cardData, index) => {
            this.children[`card${index}`] = {
                object: new DefaultCard(
                    cardData.title,
                    cardData.body,
                    cardData.author
                ),
                parentSelector:`.column`
            };
        });
    }

    template() {
        return '';
    }

    render(parent) {

        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}