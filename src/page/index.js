import { parser } from "../lib/jsx-runtime/parser.js";

import { Header } from "./Header/index.js";

const MainPage = () => parser`
    <div>
        ${Header()}
    </div>
`;

export default MainPage;
