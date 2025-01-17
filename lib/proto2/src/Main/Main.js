import {API_URL} from "../../db/env.js";
import {useEffect, useState, createComponent, useRef, createMemo} from "../../lib/react.js";
import {button, main, ul} from "../../lib/react-dom-element.js";
import Column from "./Column/Column.js";
import {div} from "../../../proto/react.js";
import {sendMessage} from "../../lib/componentSocket.js";
const C = createComponent

export default function Main({columnListRef, updateTop}) {
    const [_, update] = useState(Symbol());
    const taskify = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/db/data.json`).then(res => {
            res.json().then(data => {
                taskify.current = data
                update(Symbol())
            })
        })
    }, [])

    useEffect(() => {
        updateTop()
    }, [taskify.current])

    const addColumn = () => {
        taskify.current.columnList.push(
            createColumn(taskify.current.nextKey++)
        )
        sendMessage(1, {type: 2, data: [taskify.current.columnList[taskify.current.columnList.length - 1].title], time: new Date()})
        update(Symbol())
    }


    if (columnListRef.current) {
        updateTop()
    }



    return (
        C(main, {children: [
            C(ul, {ref: columnListRef, className: 'columnList', children:
                taskify.current?.columnList.map((column, i) => {
                    const {key, title, cardList, nextKey} = column;

                    return C(Column, {key, taskify, columnIndex: i, updateMain: update, updateTop})
                })
            }),
            C(ButtonBox, {addColumn: addColumn}),]
        })
    )
}

function ButtonBox({addColumn}) {
    const [hover, setHover] = useState(false)


    const style1 = {}
    const style2 = {}
    const style3 = {}
    if (hover) {
        style1.visibility = 'visible';
        style1.transform = 'translateY(-72px)';
        style2.visibility = 'visible';
        style2.transform = 'translateY(-144px)';
        style3.hover = '200px'
    }
    else {

    }

    return (
        C(div, {className: 'buttonBox', children: [
            C(button, {}),
            C(button, {}),
            C(button, {onClick: addColumn})
        ]})
    )
}


const createColumn = (key) => {
    return {
        key: key,
        title: `새로운 리스트${key}`,
        cardList: [],
        nextKey: 0
    }
}