import { Button } from "../../../components/Button/button.js";
import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    children = {};
    events = [];

    constructor(columnList) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData),
                parentSelector: "#column-list"
            };
        });
    }

    template() {
        return `
            <div id = "column-list">

            </div>
        `;
    }

    render(parent) {
        super.render(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}