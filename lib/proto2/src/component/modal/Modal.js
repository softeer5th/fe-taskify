import {createComponent, useEffect} from "../../../lib/react.js";
import {section, div, h3, button} from "../../../lib/react-dom-element.js";

const C = createComponent




export default function Modal({type, onCancel, onAct}){

    useEffect(() => {
        // 스크롤 막기
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            // 스크롤 복구
            document.body.style.overflow = originalOverflow;
        };
    }, []);

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