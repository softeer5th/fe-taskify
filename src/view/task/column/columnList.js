import { Button } from "../../../components/Button/button.js";
import { Column } from "../../../components/column.js";
import Component from "../../../components/component.js";

export class ColumnList extends Component {

    children = {};
    events = [];

    rootId = "columnList";

    constructor(columnList) {
        super();

        columnList.forEach((columnData, index) => {
            this.children[`column${index}`] = {
                object: new Column(columnData),
                parentSelector: "#columnList"
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