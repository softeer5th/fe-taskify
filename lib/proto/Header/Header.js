import {component, useRef, useWatch} from "../react.js";
const C = component
import {h1, header} from "../react-dom-element.js";


export default function Header() {
    const ref = useRef()

    useWatch(() => {
        console.log("useWatch 정상 동작: Header 마운트", ref);

        // DOM 요소 배경색 변경
        if (ref.current) {
            ref.current.style.backgroundColor = "yellow";
            console.log("DOM 요소 조작 성공:", ref.current);
        } else {
            console.error("ref.current가 null입니다.");
        }
    }, [])

    return (
        C(header, {className: "header", children: [
            C(h1, {ref: ref, children: [
                'TASKIFY'
            ]})
        ]})
    )
}