import {createComponent, createMemo, createPortal, useEffect, useRef, useState} from "../../../../lib/react.js";
const C = createComponent
import {li, h3, pre, span, div, button} from "../../../../lib/react-dom-element.js";
import Button from "../component/IconButton.js";
import Modal from "../../../component/modal/Modal.js";
import {sendMessage} from "../../../../lib/componentSocket.js";


export default function Card({taskify, columnIndex, cardIndex, updateTop, updateMain, updateColumn}) {
    const [_, update] = useState(Symbol())
    const card = taskify.current.columnList[columnIndex].cardList[cardIndex];
    const {title, text, key, date} = card
    const contentEditable = useRef(false)
    const modalOpen = useRef(false)
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    const testRef = useRef(null);



    useEffect(() => {
        updateTop()

        const element = cardRef.current;

        // ResizeObserver 초기화
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect) {
                    updateTop()
                }
            }
        });

        if (element) {
            resizeObserver.observe(element); // 대상 요소 감시 시작
        }

        return () => {
            updateTop()
            resizeObserver.disconnect(); // 클린업 시 옵저버 해제
        };
    }, []);




    // 카드 수정 시작
    const startModifyCard = () => {
        contentEditable.current = true
        update(Symbol())
    }

    // 카드 수정 취소
    const onCancel = () => {
        titleRef.current.textContent = title;
        textRef.current.textContent = text;
        contentEditable.current = false
        update(Symbol())
    }

    // 카드 수정 저장
    const onAct = () => {
        if (titleRef.current.textContent !== '' && titleRef.current.textContent !== '') {
            contentEditable.current = false
            card.title = titleRef.current.textContent
            card.text = textRef.current.textContent
            sendMessage(1, {type: 6, data: [taskify.current.columnList[columnIndex].title, card.title], time: new Date()})
            update(Symbol())
        }
    }

    // 저장 가능 여부
    const checkDisabled = () => {
        if (titleRef.current.textContent === '' || textRef.current.textContent === '') {
            testRef.current(true)
        }
        else {
            testRef.current(false)
        }

    }

    const openModal = () => {
        modalOpen.current = true
        update(Symbol())
    }

    const closeModal = () => {
        modalOpen.current = false
        update(Symbol())
    }


    // 카드 삭제
    const removeCard = () => {
        sendMessage(1, {type: 4, data: [taskify.current.columnList[columnIndex].title, taskify.current.columnList[columnIndex].cardList[cardIndex].title], time: new Date()})
        taskify.current.columnList[columnIndex].cardList.splice(cardIndex, 1)
        updateColumn(Symbol())
    }


    return (
        C(li, {ref: cardRef, className: 'card', children: [
            C(div, {className: 'textArea', children: [
                C(h3, {onInput: checkDisabled, ref: titleRef, contentEditable: contentEditable.current, children: [title]}),
                C(pre, {onInput: checkDisabled, ref: textRef, contentEditable: contentEditable.current, children: [text]}),
                contentEditable.current ? C(ModifyButton, {ref2: testRef, onCancel, onAct, initDisabled: title === '' || text === ''}) : C(span, {children: ['author by web']}),]}),
            contentEditable.current ?
                null :
                C(div, {onMouseDown: () => true, className: 'iconButtons', children: [
                    C(Button, {onClick: openModal,  type: 1}),
                    C(Button, {onClick: startModifyCard, type: 2}),]}),
                modalOpen.current ? createPortal(C(Modal, {type: `카드[제목: ${card.title}]`, onAct: removeCard, onCancel: closeModal}), document.body) : null
            ]})
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