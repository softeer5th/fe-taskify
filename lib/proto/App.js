import {component, useState} from "./react.js";
const C = component
import {div} from "./react-dom-element.js";

import Main from "./Main/Main.js";
import Header from "./Header/Header.js";

export default function App() {
    const [state, setState] = useState(true)



    return (
        C(div, {children: [
            C(Header, {key: 1}),
            C(Main, {key: 2}),
        ]})
    )
}