import {createComponent} from "../../lib/react.js";
const C = createComponent
import {button, h1, header} from "../../lib/react-dom-element.js";
import Sort from "../component/svg/Sort.js";


export default function Header({latest, updateTop}) {

    const click = () => {
        latest.current = !latest.current
        updateTop()
    }

    return (
        C(header, {className: "header", children: [
            C(h1, {children: [
                'TASKIFY'
            ]}),
            C(button, {onClick: click, children: [
                C(Sort, {}),
                latest ? '생성 순' : '최신 순']})
        ]})
    )
}