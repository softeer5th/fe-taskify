import {component, useState} from "../react.js";
const C = component
import {main, ul} from "../react-dom-element.js";
import Column from "./Column/Column.js";


const initTaskifyData = {
    columnList: [
        {
            key: 0,
            columnTitle: "해야할 일",
            cardList: [
                {
                    key: 0,
                    title: "타이틀1",
                    text: "텍스트1",
                },
                {
                    key: 1,
                    title: "타이틀2",
                    text: "텍스트2",
                },
            ],
            nextCardKey: 2
        },
        {
            key: 1,
            columnTitle: "하고 있는 일",
            cardList: [
                {
                    key: 0,
                    title: "타이틀1",
                    text: "텍스트1",
                },
                {
                    key: 1,
                    title: "타이틀2",
                    text: "텍스트2",
                },
            ],
            nextCardKey: 2
        }
    ],
    nextColumnKey: 2
}

export default function Main(columnsData) {
    const [taskifyData, setTaskifyData] = useState(initTaskifyData);


    const editCardData = ({flag, data}) => {
        const {columnKey, cardKey} = data

        switch (flag) {
            // 카드 수정
            case 1:
                const {cardTitle1, cardText1} = data;

                // 현재 setState는 얕은 비교를 하여 같으면 동작 안함
                const copy1 = {...taskifyData}
                const card = copy1[columnKey].find((card) => card.key === cardKey)
                card.title = cardTitle1;
                card.text = cardText1;

                setTaskifyData(copy1)
                break
            // 카드 삭제
            case 2:
                const copy2 = {...taskifyData}
                const index = copy2[columnKey].findIndex((card) => card.key === cardKey)
                copy2[columnKey].splice(index, 1)

                setTaskifyData(copy2)
                break
            // 카드 추가
            case 3:
                const {cardTitle3, cardText3} = data;
                const copy3 = {...taskifyData}
                const nextKey = copy3[columnKey].nextCardKey++
                copy3[columnKey].push({
                    key: nextKey,
                    title: cardTitle3,
                    text: cardText3,
                })
                setTaskifyData(copy3)
                break
            default:
        }
    }

    const editColumnData = ({flag, data}) => {
        const {columnKey} = data

        switch (flag) {
            // 컬럼 제목 수정
            case 1:
                const {columnTitle1} = data
                const copy1 = {...taskifyData}
                const column = copy1.find((column) => column.key === columnKey)
                column.columnTitle = columnTitle1;

                setTaskifyData(copy1)
                break
            // 컬럼 삭제
            case 2:
                const copy2 = {...taskifyData}
                const index = copy2.findIndex((column) => column.key === columnKey)
                copy2.splice(index, 1)

                setTaskifyData(copy2)
                break
            // 컬럼 추가
            case 3:
                const {columnTitle2} = data
                const copy3 = {...taskifyData}
                const nextKey = copy3.nextColumnKey++

                copy3.push({
                    key: nextKey,
                    columnTitle: columnTitle2,
                    cardsList: {},
                    nextCardKey: 0,
                })

                setTaskifyData(copy3)
                break
            default:
        }
    }


    const makeColumnList = (columnsData) => {
        return columnsData.columnList.map((columnData) => {
            return C(Column, {...columnData});
        })
    }


    return (
        C(main, {children: [
            C(ul, {className: 'columnList', children: makeColumnList(taskifyData)})
        ]})
    )
}