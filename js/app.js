import { createComponent } from "./global/createComponent.js";
import { columnStore } from "./store/column.js";
import { Navbar } from "./container/navbar.js";
import { ColumnList } from "./container/columnList.js";

export const App = () => {
    const store = columnStore();
    return createComponent({
        initialState : {
            columns: store.getColumns(),
        },
        render: ({state, setState}) => {
            console.log(store.getColumns());
            const app = document.createElement("div");

            app.appendChild(Navbar());
            const columnList = ColumnList({
                columns: state,
                onAddCard: (columnId, cardData) => {
                store.createCard(columnId, cardData);
                setState({columns: store.getColumns()}); // 상태 갱신
                },
                onDeleteCard: (columnId, cardId) => {
                store.deleteCard(columnId, cardId);
                setState({columns: store.getColumns()}); // 상태 갱신
                },
                onUpdateCard: (columnId, cardId, updatedCard) => {
                store.updateCard(columnId, cardId, updatedCard);
                setState({columns: store.getColumns()}); // 상태 갱신
                },
            });

            app.appendChild(columnList);
            console.log("Rendered DOM structure:", document.querySelector(".root-container"));

            return app;
        }
    })
}