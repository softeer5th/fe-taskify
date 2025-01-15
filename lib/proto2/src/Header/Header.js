import {createComponent} from "../../lib/react.js";
const C = createComponent
import {h1, header} from "../../lib/react-dom-element.js";


export default function Header() {

    return (
        C(header, {className: "header", children: [
            C(h1, {children: [
                'TASKIFY'
            ]})
        ]})
    )
}