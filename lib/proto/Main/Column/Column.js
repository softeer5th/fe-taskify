import {component, useRef, useState, useEffect} from "../../react.js";
const C = component
import {div, button, span, li, h2, ul} from "../../react-dom-element.js";
import Card from "./Card/Card.js";
import Button from "./component/IconButton.js";


export default function Column({state, setState}) {
    const {taskifyData, columnData, columnIndex} = state;

    const makeCardList = (columnData) => {
        return columnData.cardList.map((cardData) => {
            return C(Card, {columnKey: columnData.key, ...cardData});
        })
    }

    const changeTitle = (ref) => {
        if (ref.current.textContent) {
            const newTaskifyData = {...taskifyData};
            newTaskifyData.columnList[columnIndex].title = ref.current.textContent
            setState.setTaskifyData(newTaskifyData)
        }
        else {
            ref.current.textContent = columnData.title;
        }
    }

    return (
        C(li, {className: 'column', children: [
            C(Header, {state: {taskifyData, columnIndex}, setState: {changeTitle , setTaskifyData: setState.setTaskifyData}}),
            C(ul, {className: 'cardList', children: makeCardList(columnData)})]})
    )
}




function Header({state: {taskifyData, columnIndex}, setState: {changeTitle, setTaskifyData}}) {
    const [contentEditable, setContentEditable] = useState(false);
    const [modalOpen, setModalOpen] = useState(0);
    const ref = useRef();

    const title = taskifyData.columnList[columnIndex].title;
    const cardCount = taskifyData.columnList[columnIndex].cardList.length;

    useEffect(() => {
        const root = document.getElementById('root')
        const eventListener = (e) => {
            if (e.target !== ref.current) {
                setContentEditable(false)
                changeTitle(ref)
            }
        }
        if (contentEditable) {
            ref.current.focus();
            root.addEventListener('click', eventListener)
        }

        return () => {
            root.removeEventListener('click', eventListener)
        }
    }, [contentEditable])

    useEffect(() => {
        // 카드 추가
        if (modalOpen === 1) {

        }
        // 컬럼 삭제
        else if (modalOpen === 2) {

        }
        // 모달 닫기
        else {

        }
    }, [modalOpen])

    const keyDown = (e) => {
        if (e.event.key === 'Enter') {
            e.event.preventDefault()
        }
    }

    const doubleClick = () => {
        setContentEditable(true)
    }

    const cancleEvent = () => {
        setModalOpen(false)
    }
    const deleteEvent = () => {
        const newTaskifyData = {...taskifyData};
        newTaskifyData.columnList.splice(columnIndex, 1)
        setTaskifyData(newTaskifyData);
        setModalOpen(false)
    }


    return (
        C(div, {className: 'columnHeader', children: [
            C(div, {className: 'columnHeader_textArea', children: [
                C(h2, {ref: ref, onKeyDown: keyDown,  onDoubleClick: doubleClick, contentEditable: contentEditable, children: [title]}),
                C(div, {children: [`${cardCount}`]})]}),
            C(div, {className: 'columnHeader_iconButtons', children: [
                C(Button, {onClick: () => setModalOpen(1) ,type:3}),
                C(Button, {onClick: () => setModalOpen(2),type:1}),]}),]})
    )
}
