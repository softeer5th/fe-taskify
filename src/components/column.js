import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";
import { DefaultCard } from "./Card/card.js";
import { EditCard } from "./Card/editCard.js";
import { ColumnHeader } from "./columnHeader.js";

export class Column extends Component {

    events = [];

    constructor(columnData, onCardAdd = () => {}, onCardDelete = (cardIndex) => {}) {
        super();
        super.addRootclass("column");
        this.setCallback(onCardAdd, onCardDelete);

        this.setChildren(columnData);
        
    }

    setCallback(onCardAdd, onCardDelete){
        this.onCardAdd = () => {
            console.log("add!!");
            this.toggleAddCard();
        };

        this.onColumnDelete = () => {
            
        };

        this.onNewCardAdd = () => {
            this.toggleAddCard();
        }; 
        this.onNewCardDismiss = () => {

            this.toggleAddCard();
        };
    }

    setChildren(columnData){
        this.children = {
            header: {
                object: new ColumnHeader(columnData.name, columnData.data.length, this.onCardAdd, this.onColumnDelete),
                parentSelector: `.column`
            },
            input: {
                object: new EditCard('','', this.onNewCardAdd, this.onNewCardDismiss )
            }
        };
    
        columnData.data.forEach((cardData, index) => {
            this.children[`card${index}`] = {
                object: new DefaultCard(
                    cardData.title,
                    cardData.body,
                    cardData.author,
                    () => {
                        onCardDelete(index);
                    },
                    () => {

                    }

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
        this.toggleAddCard()
    }
    
    toggleAddCard(){
        const inputRootClass = this.children.input.object.rootSelectorClassName;
        const input = this.parent.querySelector(`.${inputRootClass}`);

        input.classList.toggle("hide");
    
    }

    addEvent(listenerName, callback) {
        super.addEvent(listenerName, callback);

    }

}