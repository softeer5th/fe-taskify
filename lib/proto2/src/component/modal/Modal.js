import {createComponent, useEffect} from "../../../lib/react.js";
import {section, div, h3, button} from "../../../lib/react-dom-element.js";

const C = createComponent




export default function Modal({type, onCancel, onAct}){

    useEffect(()=>{
        console.log("모달 마운트");
        () => console.log("모달 언마운트")
    })
    return (
        C(section, {className: 'modal', children: [
            C(div, {children: [
                C(h3, {children: [`선택한 ${type}를 삭제할까요?`]}),
                C(div, {children: [
                    C(button, {onClick: onCancel, children: ["취소"]}),
                    C(button, {onClick: onAct, children: ["삭제"]})
                ]})
            ]})
        ]})
    )
}