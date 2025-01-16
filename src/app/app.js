import { Card } from "../components/Card/index.js";
import { ColumnTitle } from "../components/ColumnTitle/index.js";
import { parser } from "../lib/jsx-runtime/index.js";

const App = () => parser`
        <div>
            ${Card({ title: "TITLE", body: "BODY" })}
            ${ColumnTitle({ title: "COLUMN", count: 1 })}
        </div>`;

export default App;
