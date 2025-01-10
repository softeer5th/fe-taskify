import {component, div, h1, useState} from "./react.js";

export default function Test({className, children, ha, value }) {
    const [state, setState] = useState(1)
    console.log('렌더링', children)
    const onClickHandler = () => {
        setState(state+1)
    }

    return (
        component(h1, {className: className, onClick: ha ? ha : onClickHandler, children: [
                `${children} - ${value ? value : state}`
            ]})
    )
}