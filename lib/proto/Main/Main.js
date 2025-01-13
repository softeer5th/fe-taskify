import {component, useState} from "../react.js";
const C = component
import {main, ul} from "../react-dom-element.js";
import Column from "./Column/Column.js";

const makeColumnData = (key) => {
    return {
        key: key,
        title: `새로운 리스트${key}`,
        cardList: [],
        nextCardKey: 0
    }
}
const makeCardData = (key) => {
    return {
        key: key,
        title: `새로운 카드${key}`,
        text: "내용을 입력하세요",
    }
}
export {makeColumnData, makeCardData}

const initTaskifyData = {
    columnList: [makeColumnData(0), makeColumnData(1)],
    nextColumnKey: 2
}
initTaskifyData.columnList[0].cardList.push(makeCardData(0), makeCardData(1))
initTaskifyData.columnList[0].nextCardKey = 2
initTaskifyData.columnList[1].cardList.push(makeCardData(0), makeCardData(1))
initTaskifyData.columnList[1].nextCardKey = 2


export default function Main(columnsData) {
    const [taskifyData, setTaskifyData] = useState(initTaskifyData);

    const makeColumnList = (columnsData) => {
        return columnsData.columnList.map((columnData, columnIndex) => {
            return C(Column, {state: {taskifyData, columnData, columnIndex}, setState: {setTaskifyData}});
        })
    }


    return (
        C(main, {children: [
            C(ul, {className: 'columnList', children: makeColumnList(taskifyData)})
        ]})
    )
}