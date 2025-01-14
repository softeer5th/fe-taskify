import { Button } from "../../../components/Button/button.js";
import Component from "../../../components/component.js";
import { DefaultCard } from "./Card/card.js";
import { EditCard } from "./Card/editCard.js";
import { ColumnHeader } from "./columnHeader.js";

export class Column extends Component {

    events = [];

    constructor(columnData, onCardAdded = (newCardData) => {}, onCardDelete = (cardIndex) => {}) {
        super();
        super.addRootclass("column");
        this.setCallback(onCardAdded, onCardDelete);

        this.setChildren(columnData);
        
    }

    setCallback(onCardAdded, onCardDelete){
        
        this.onCardAdd = () => {
           this.toggleAddCard();
        }

        this.onColumnDelete = () => {
            
        };

        this.onCardDelete = onCardDelete;

        this.onNewCardAdded = (newCardData) => {
            onCardAdded(newCardData);
            this.toggleAddCard();
        }; 
        this.onNewCardDismiss = () => {
            this.children.input.object.clearInput();
            this.toggleAddCard();
        };

        this.onEditCard = () => {

        }
    }

    setChildren(columnData){
        this.children = {
            header: {
                object: new ColumnHeader(columnData.name, columnData.data.length, this.onCardAdd, this.onColumnDelete),
                parentSelector: `.column`
            },
            input: {
                object: new EditCard('','', this.onNewCardAdded, this.onNewCardDismiss )
            }
        };
    
        columnData.data.forEach((cardData, index) => {
            this.children[`card${index}`] = {
                object: new DefaultCard(
                    cardData.title,
                    cardData.body,
                    cardData.author,
                    () => {
                        this.onCardDelete(index);
                    },
                    this.onEditCard,
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