import {createComponent, createMemo, useEffect, useRef, useState} from "../../../../lib/react.js";
const C = createComponent
import {li, h3, pre, span, div, button} from "../../../../lib/react-dom-element.js";
import Button from "../component/IconButton.js";


export default function Card({cardData, modifyCard, removeCard}) {
    const [title, text] = [cardData.title, cardData.text];
    const [contentEditable, setContentEditable] = useState(false)
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const testRef = useRef(null);


    const startModifyCard = () => {
        setContentEditable(true)
    }

    const onCancel = () => {
        titleRef.current.textContent = title;
        textRef.current.textContent = text;
        setContentEditable(false)
    }

    const onAct = () => {
        if (titleRef.current.textContent !== '' && titleRef.current.textContent !== '') {
            setContentEditable(false)
            modifyCard(titleRef.current.textContent, textRef.current.textContent);
        }
    }

    const checkDisabled = () => {
        if (titleRef.current.textContent === '' || textRef.current.textContent === '') {
            testRef.current(true)
        }
        else {
            testRef.current(false)
        }
    }

    return (
        C(li, {className: 'card', draggable: true, children: [
            C(div, {className: 'textArea', children: [
                C(h3, {onInput: checkDisabled, ref: titleRef, contentEditable, children: [title]}),
                C(pre, {onInput: checkDisabled, ref: textRef, contentEditable, children: [text]}),
                contentEditable ? C(ModifyButton, {ref2: testRef, onCancel, onAct, initDisabled: title === '' || text === ''}) : C(span, {children: ['author by web']}),]}),
            contentEditable ? null : C(div, {className: 'iconButtons', children: [
                C(Button, {onClick: removeCard,  type: 1}),
                C(Button, {onClick: startModifyCard, type: 2}),]})]})
    )
}




function ModifyButton({onCancel, onAct, ref2, initDisabled}) {
    const [disabled, setDisabled] = useState(initDisabled)
    ref2.current = setDisabled

    return (
        C(div, {className: 'cardModifyButton', children: [
            C(button, {onClick: onCancel, children: ['취소']}),
            C(button, disabled ? {onClick: onAct, disabled, children: ['저장']} : {onClick: onAct, children: ['저장']}),
        ]})
    )
}