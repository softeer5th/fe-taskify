import {component, div} from "./react.js";

export default function Test({children}) {
    return (
        component(div, {className: 'gaga', children: [
                ...children,
                "하아아아아"
            ]})
    )
}