import {component, div, h1, useState} from "./react.js";
import Test from "./Test.js";

export default function App() {
    const [state, setState] = useState(1)

    const onClickHandler = (e) => {
        setState(state+1)
    }

    return (
        component(div, {memo: (oldP, newP) => oldP === newP, value: 2, children: [
                component(div, {key: 1, className: 'div1', onClick: onClickHandler, children: [
                        component(h1, {key: 1, className: 'span1', children: ['아하하하']})
                    ]}),
                `${state}`,
                component(div, {key: 2, className: 'div2', children: []})
            ]})
    )
}