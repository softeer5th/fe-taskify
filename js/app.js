import { createComponent } from "./global/createComponent.js";
import { columnStore } from "./store/column.js";
import { Navbar } from "./container/navbar.js";
import { ColumnList } from "./container/columnList.js";
import { initializeGlobalInputEvents } from "./event/index.js";

export const App = () => {

    const store = columnStore();

    initializeGlobalInputEvents();
    return createComponent({
        initialState: {
            columns: store.getColumns(),
        },

        render: ({ state, setState }) => {
            const app = document.createDocumentFragment();
            app.appendChild(Navbar());
            const columnList = ColumnList({
                columnList: state,
                setState
            });
            app.appendChild(columnList);
            return app;
        },
        className: "root-container"
    })
}