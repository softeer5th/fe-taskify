import Component from "../component.js";

export class DefaultCard extends Component {

    children = {

    };

    events = [];

    closeIconRef = "/assets/images/closed.svg";
    editIconRef = "/assets/images/edit.svg";

    constructor(title, body, author, onCloseClick = () => {
    }, onEditClick = () => { }) {
        super();
        super.addRootclass("card");
        super.addRootclass("card-default");
        this.title = title;
        this.body = body;
        this.author = author;
        this.onCloseClick = onCloseClick;
        this.onEditClick = onEditClick;

    }

    template() {
        return `
            <div class = "card-text_area">
                <div class = "card-title display-bold24">
                    ${this.title}
                </div>
                <div class = "card-body display-medium14">
                    ${this.body}
                </div>
                <div class = "card-author display-medium12">
                    author by ${this.author}
                </div>
            </div>
            <div class = "card-icons">
                <img src=${this.closeIconRef} alt="close-icon" class="card-icon" id = "close-icon" />
                <img src=${this.editIconRef} alt="edit-icon" class="card-icon" id = "edit-icon" />
            </div>
    `;
    }
    render(parent) {

        super.renderTree(parent);

        const component = parent.querySelector(`.${this.rootSelectorClassName}`);
        const close = component.querySelector("#close-icon");

        if (close) {
            close.addEventListener("click", (event) => {
                this.onCloseClick();
            });
        }

        const edit = component.querySelector("#edit-icon");

        if (edit) {

            edit.addEventListener("click", (event) => {
                this.onEditClick();
            }, false);

        }

        super.setEvents(parent);
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);
    }

}