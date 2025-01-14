import { Card } from "../components/Card/index.js";
import { parser } from "../lib/jsx-runtime/index.js";

const App = () => parser`
        <div>
            ${Card({ title: "TITLE", body: "BODY" })}
        </div>`;

export default App;
