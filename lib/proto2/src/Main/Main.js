import {createComponent, useState, useEffect, createPortal} from "../../lib/react.js";
const C = createComponent
import {main, ul} from "../../lib/react-dom-element.js";
import {API_URL} from "../../db/env.js";
import Column from "./Column/Column.js";
import Card from "./Column/Card/Card.js";
import Modal from "../component/modal/Modal.js";

const createColumnData = (key) => {
    return {
        key: key,
        title: `새로운 리스트${key}`,
        cardList: [],
        nextKey: 0
    }
}
const createCardData = (key) => {
    return {
        key: key,
        title: `새로운 카드${key}`,
        text: "내용을 입력하세요",
        date: new Date(),
    }
}


export default function Main() {
    const [taskifyData, setTaskifyData] = useState(null);
    const [modal, setModal] = useState({
        open: false,
        type: '',
        onCancel: () => {},
        onAct: () => {}
    });

    // 서버 데이터 가져오기. 마운트 이후에
    useEffect(() => {
        fetch(`${API_URL}/db/data.json`).then(res => {
            res.json().then(data => {
                setTaskifyData(data)
            })
        })
    }, [])


    // 카드 렌더링
    const renderCardList = (cardList, columnKey) => {
        return cardList.map((cardData) => {
            return C(Card, {
                cardData: cardData,
                modifyCard: (title, text) => {
                    const columnIndex = taskifyData.columnList.findIndex((column) => column.key === columnKey)
                    const cardIndex = cardList.findIndex(card => card.key === cardData.key)
                    if (cardIndex != null && columnIndex != null) {
                        const newTaskifyData = {...taskifyData}
                        // 해당 카드만 객체 참조 다르게
                        const newCard = {...newTaskifyData.columnList[columnIndex].cardList[cardIndex]}
                        newCard.title = title
                        newCard.text = text
                        newTaskifyData.columnList[columnIndex].cardList[cardIndex] = newCard
                        setTaskifyData(newTaskifyData)
                    }
                },
                removeCard: () => {
                    setModal({
                        open: true,
                        type: `카드[제목: ${cardData.title}]`,
                        onCancel: () => {
                            // 모달 닫기
                            setModal({
                                open: false,
                                type: '',
                                onCancel: () => {},
                                onAct: () => {},
                            })
                        },
                        onAct: () => {
                            const columnIndex = taskifyData.columnList.findIndex((column) => column.key === columnKey)
                            const cardIndex = cardList.findIndex(card => card.key === cardData.key)
                            if (cardIndex != null && columnIndex != null) {
                                const newTaskifyData = {...taskifyData}
                                newTaskifyData.columnList[columnIndex].cardList.splice(cardIndex, 1)
                                setTaskifyData(newTaskifyData)
                            }
                            // 모달 닫기
                            setModal({
                                open: false,
                                type: '',
                                onCancel: () => {},
                                onAct: () => {},
                            })

                        },
                    });
                },
                key: cardData.key})
        })
    }
    // 컬럼 렌더링
    const renderColumnList = (columnList) => {
        return columnList.map((columnData) => {
            return C(Column, {
                columnData: columnData,
                modifyTitle: (newTitle) => {
                    const newTaskifyData = {...taskifyData}
                    const columnIndex = taskifyData.columnList.findIndex(column => column.key === columnData.key)
                    newTaskifyData.columnList[columnIndex] = {
                        ...newTaskifyData.columnList[columnIndex],
                        title: newTitle
                    }
                    setTaskifyData(newTaskifyData)
                },
                addCard: () => {
                    const newTaskifyData = {...taskifyData}
                    const columnIndex = taskifyData.columnList.findIndex(column => column.key === columnData.key)
                    if (columnIndex != null) {
                        const newColumn = {...newTaskifyData.columnList[columnIndex]}
                        const newCard = createCardData(newColumn.nextKey)
                        newColumn.nextKey += 1
                        newColumn.cardList.push(newCard)
                        newTaskifyData.columnList[columnIndex] = newColumn
                        setTaskifyData(newTaskifyData)
                    }
                },
                removeColumn: () => {
                    setModal({
                        open: true,
                        type: `리스트[제목: ${columnData.title}]`,
                        onCancel: () => {
                            // 모달 닫기
                            setModal({
                                open: false,
                                type: '',
                                onCancel: () => {},
                                onAct: () => {},
                            })
                        },
                        onAct: () => {
                            const columnIndex = taskifyData.columnList.findIndex((column) => column.key === columnData.key)
                            if (columnIndex != null) {
                                const newTaskifyData = {...taskifyData}
                                newTaskifyData.columnList.splice(columnIndex, 1)
                                setTaskifyData(newTaskifyData)
                            }
                            // 모달 닫기
                            setModal({
                                open: false,
                                type: '',
                                onCancel: () => {},
                                onAct: () => {},
                            })

                        },
                    });
                },
                key: columnData.key,
                children: renderCardList(columnData.cardList, columnData.key)});
        })
    }


    return (
        C(main, {children: [
            C(ul, {className: 'columnList', children: taskifyData == null ? [] : renderColumnList(taskifyData.columnList)}),
            modal.open ? createPortal(C(Modal,{type: modal.type, onCancel: modal.onCancel, onAct: modal.onAct}), document.body) : null
        ]})
    )
}