import {createComponent, useRef, useState, useEffect, } from "../../../lib/react.js";
const C = createComponent
import {div, button, span, li, h2, ul} from "../../../lib/react-dom-element.js";
import Button from "./component/IconButton.js";


export default function Column({columnData, modifyTitle, addCard, removeColumn, children}) {
    console.log(columnData)


    return (
        C(li, {className: 'column', children: [
            C(Header, {modifyTitle, addCard, removeColumn, title: columnData.title, cardCount: columnData.cardList.length}),
            C(ul, {className: 'cardList', children: children})]})
    )
}




function Header({modifyTitle, addCard, removeColumn, title, cardCount}) {
    const [contentEditable, setContentEditable] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const root = document.getElementById('root')
        const eventListener = (e) => {
            if (e.target !== ref.current) {
                setContentEditable(false)
                if (ref.current.textContent && contentEditable === true) {
                    modifyTitle(ref.current.textContent)
                }
                else {
                    ref.current.textContent = title;
                }
            }
        }
        if (contentEditable) {
            ref.current.focus();
            root.addEventListener('click', eventListener)
        }

        return () => {
            root.removeEventListener('click', eventListener)
        }
    }, [contentEditable, modifyTitle, ref.current, title])

    const keyDown = (e) => {
        if (e.event.key === 'Enter') {
            e.event.preventDefault()
        }
    }

    const doubleClick = () => {
        setContentEditable(true)
    }

    return (
        C(div, {className: 'columnHeader', children: [
            C(div, {className: 'columnHeader_textArea', children: [
                C(h2, {ref: ref, onKeyDown: keyDown,  onDoubleClick: doubleClick, contentEditable: contentEditable, children: [title]}),
                C(div, {children: [`${cardCount}`]})]}),
            C(div, {className: 'columnHeader_iconButtons', children: [
                C(Button, {onClick: addCard, type:3}),
                C(Button, {onClick: removeColumn, type:1}),]}),]})
    )
}
