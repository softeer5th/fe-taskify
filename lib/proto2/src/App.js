import {createComponent} from "../lib/react.js";
const C = createComponent
import {div} from "../lib/react-dom-element.js";
import Header from "./Header/Header.js";
import Main from "./Main/Main.js";


export default function App() {


    return (
        C(div, {children: [
                C(Header, {key: 1}),
                C(Main, {key: 2}),
            ]})
    )
}