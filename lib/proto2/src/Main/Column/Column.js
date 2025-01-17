import {createComponent, useRef, useState, useEffect, createPortal} from "../../../lib/react.js";
const C = createComponent
import {div, button, span, li, h2, ul} from "../../../lib/react-dom-element.js";
import Button from "./component/IconButton.js";
import Card from "./Card/Card.js";
import Modal from "../../component/modal/Modal.js";
import {sendMessage} from "../../../lib/componentSocket.js";


export default function Column({taskify, columnIndex, updateMain, updateTop}) {
    const [_, update] = useState(Symbol());
    const column = taskify.current.columnList[columnIndex];
    const {cardList} = column;
    const ref = useRef();

    useEffect(() => {
        updateTop()
    }, [cardList.length])

    return (
        C(li, {className: 'column', children: [
            C(Header, {taskify, columnIndex, updateMain: updateMain, updateColumn: update}),
            C(ul, {ref, className: 'cardList', children:
                    cardList.map((card, i) => {
                        const {key} = card;
                        return C(Card, {key, taskify, columnIndex, cardIndex: i, updateTop, updateMain: updateMain, updateColumn: update});
                })
            }),]})
    )
}






function Header({taskify, columnIndex, updateMain, updateColumn}) {
    const [_, update] = useState(Symbol());
    const h2Ref = useRef();
    const contentEditable = useRef(false);
    const modalOpen = useRef(false)

    const column = taskify.current.columnList[columnIndex];

    useEffect(() => {
        const root = document.getElementById('root')

        const eventListener = (e) => {
            if (e.target !== h2Ref.current) {
                contentEditable.current = false

                if (h2Ref.current.textContent) {
                    column.title = h2Ref.current.textContent;
                    sendMessage(1, {type: 3, data: [taskify.current.columnList[columnIndex].title], time: new Date()})
                    update(Symbol());
                }
                else {
                    console.log(h2Ref.current.textContent, contentEditable.current)
                    h2Ref.current.textContent = column.title;
                }
            }
        }

        if (contentEditable.current) {
            h2Ref.current.focus();
            root.addEventListener('click', eventListener)
        }

        return () => {
            root.removeEventListener('click', eventListener)
        }
    }, [contentEditable.current]);

    const keyDown = (e) => {
        if (e.event.key === 'Enter') {
            e.event.preventDefault()
        }
    }

    const doubleClick = () => {
        contentEditable.current = true
        update(Symbol());
    }

    const addCard = () => {
        const newCard = createCard(column.nextKey++)
        column.cardList.push(newCard)
        sendMessage(1, {type: 5, data: [taskify.current.columnList[columnIndex].title, newCard.title], time: new Date()})
        updateColumn(Symbol())
    }

    const removeColumn = () => {
        sendMessage(1, {type: 1, data: [taskify.current.columnList[columnIndex].title], time: new Date()})
        taskify.current.columnList.splice(columnIndex, 1)
        updateMain(Symbol())
    }

    const openModal = () => {
        modalOpen.current = true
        update(Symbol())
    }

    const closeModal = () => {
        modalOpen.current = false
        update(Symbol())
    }

    return (
        C(div, {className: 'columnHeader', children: [
                C(div, {className: 'columnHeader_textArea', children: [
                        C(h2, {ref: h2Ref, onKeyDown: keyDown,  onDoubleClick: doubleClick, contentEditable: contentEditable.current, children: [column.title]}),
                        C(div, {children: [`${column.cardList.length}`]})]}),
                C(div, {className: 'columnHeader_iconButtons', children: [
                        C(Button, {onClick: addCard, type:3}),
                        C(Button, {onClick: openModal, type:1}),]}),
                modalOpen.current ? createPortal(C(Modal, {type: `리스트[제목: ${column.title}]`, onAct: removeColumn, onCancel: closeModal}), document.body) : null
            ]})
    )
}


const createCard = (key) => {
    return {
        key: key,
        title: `새로운 카드${key}`,
        text: "내용을 입력하세요",
        date: new Date(),
    }
}