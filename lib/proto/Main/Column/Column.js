import {component, useState} from "../../react.js";
const C = component
import {div, button, span, li, h2, ul} from "../../react-dom-element.js";
import Card from "./Card/Card.js";
import Plus from "../../component/svg/Plus.js";
import Close from "../../component/svg/Close.js";


export default function Column(columnData) {

    const makeCardList = (columnData) => {
        return columnData.cardList.map((cardData) => {
            return C(Card, {...cardData});
        })
    }


    return (
        C(li, {className: 'column', children: [
            C(Header, {columnTitle: columnData.columnTitle, cardCount: columnData.cardList.length}),
            C(ul, {className: 'cardList', children: makeCardList(columnData)})
        ]})
    )
}


function Header({columnTitle, cardCount}) {


    return (
        C(div, {className: 'columnHeader', children: [
            C(div, {className: 'columnHeader_textArea', children: [
                C(h2, {children: [columnTitle]}),
                C(div, {children: [`${cardCount}`]})
            ]}),
            C(div, {className: 'columnHeader_iconButtons', children: [
                C(button, {children: [
                    C(Plus, {})
                ]}),
                C(button, {children: [
                    C(Close, {}),
                ]})
            ]}),
        ]})
    )
}
