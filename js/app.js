import { createComponent } from "./global/createComponent.js";
import { columnStore } from "./store/column.js";
import { Navbar } from "./container/navbar.js";
import { ColumnList } from "./container/columnList.js";

export const App = () => {

    const store = columnStore();

    return createComponent({
        initialState: {
            columns: store.getColumns(),
        },
        render: ({ state, setState }) => {
            console.log(store.getColumns());
            const app = document.createElement("div");

            app.appendChild(Navbar());
            const columnList = ColumnList({
                columnList: state,
                onAddCard: (columnId) => {
                    store.createCard(columnId);
                    setState({ columns: store.getColumns() });
                },
                onDeleteCard: (columnId, cardId) => {
                    store.deleteCard(columnId, cardId);
                    setState({ columns: store.getColumns() });
                },
                onUpdateCard: (columnId, cardId, updatedCard) => {
                    store.updateCard(columnId, cardId, updatedCard);
                    setState({ columns: store.getColumns() });
                },
            });
            app.appendChild(columnList);

            return app;
        }
    })
}