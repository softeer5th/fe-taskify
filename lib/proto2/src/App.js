import {createComponent, useRef, useState} from "../lib/react.js";
const C = createComponent
import {div} from "../lib/react-dom-element.js";
import Header from "./Header/Header.js";
import Main from "./Main/Main.js";


export default function App() {
    const latest = useRef(false);

    const columnListRef = useRef();


    const updateTop = () => {
        if (columnListRef.current == null) {
            return
        }

        Array.from(columnListRef.current.childNodes).forEach(element => {
            const column = element.childNodes[1]
            let newHeight = 0;
            let cardList = Array.from(column.childNodes); // 모든 자식을 배열로 변환

            if (latest.current) {
                cardList = cardList.reverse()
            }

            cardList.forEach((card, i) => {
                card.style.top = `${newHeight}px`; // 누적된 높이를 적용
                newHeight += card.offsetHeight + 10; // 누적된 높이 계산
            });
        })
    }

    if (columnListRef.current) {
        updateTop()
    }

    return (
        C(div, {children: [
                C(Header, {key: 1, latest, updateTop}),
                C(Main, {key: 2, columnListRef, updateTop}),
            ]})
    )
}