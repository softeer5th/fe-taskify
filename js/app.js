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
            const fragment = document.createDocumentFragment();
            const app = document.createElement("div");
            app.appendChild(Navbar());
            const columnList = ColumnList({
                columnList: state,
                setState
            });
            app.appendChild(columnList);
            fragment.appendChild(app);
            return app;
        }
    })
}