import {createComponent, useEffect, useState, useRef} from "../../../lib/react.js";
const C = createComponent
import {br, button, h1, h3, header, section, strong, time} from "../../../lib/react-dom-element.js";
import {closeSocket, openSocket} from "../../../lib/componentSocket.js";
import {div, span} from "../../../../proto/react.js";



export default function Commit() {
    const [on, setOn] = useState(false);

    const [_, update] = useState(Symbol())
    const commitList = useRef([])
    useEffect(() => {
        openSocket(1, (msg) => {
            commitList.current.push(msg)
            update(Symbol())
        })
        return () => closeSocket(1)
    }, [])


    const deleteCommit = () => {
        commitList.current = []
        update(Symbol())
    }

    return (
        C(button, {onClick: () => setOn(!on), className: 'commitButton', children: [
            '커밋 기록',
            on ? C(CommitSection, {commitList, setOn, deleteCommit}) : null
        ]})
    )
}




function CommitSection({commitList, setOn, deleteCommit}) {

    return (
        C(section, {onClick: () => true, className: 'commitSection', children: [
            C(CommitHeader, {setOn}),
            C(CommitBody, {commitList}),
            commitList.current.length > 0 ? C(CommitFooter, {deleteCommit}) : null

        ]})
    )
}


function CommitHeader({setOn}) {


    return (
        C(div, {className: 'commitHeader', children: [
            C(span, {children:['사용자 활동 기록']}),
            C(button, {onClick: () => setOn(false), children: [
                '닫기'
            ]})
        ]})
    )
}

function CommitBody({commitList}) {

    let t = []
    if (commitList.current.length > 0) {
        for (let i = commitList.current.length - 1; i >= 0; i--) {
            t.push(C(CommitCard, {msg: commitList.current[i]}))
        }

    }
    else {
        t = ['사용자 활동 기록이 없습니다.']
    }

    console.log(commitList.current.length > 0)

    return (
        C(div, {className: 'commitBody', children: t})
    )


}

function CommitFooter({deleteCommit}) {


    return (
        C(div, {className: 'commitFooter', children: [
            C(button, {onClick: deleteCommit, children: ['기록 전체 삭제']})
        ]})
    )
}


function CommitCard({msg}) {

    let children = []
    console.log(msg)
    // 리스트 삭제
    if (msg[0].type === 1) {
        children.push(
            C(strong, {children: ['삭제:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
        )
    }
    // 리스트 추가
    else if (msg[0].type === 2) {
        children.push(
            C(strong, {children: ['추가:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
        )
    }
    // 리스트 제목 수정
    else if (msg[0].type === 3) {
        children.push(
            C(strong, {children: ['수정:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
        )
    }
    // 카드 삭제
    else if (msg[0].type === 4) {
        children.push(
            C(strong, {children: ['삭제:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
            '- 카드[제목: ',
            C(strong, {children: [`${msg[0].data[1]}`]}),
            ']',
            C(br, {}),
        )
    }
    // 카드 추가
    else if (msg[0].type === 5) {
        children.push(
            C(strong, {children: ['추가:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
            '- 카드[제목: ',
            C(strong, {children: [`${msg[0].data[1]}`]}),
            ']',
            C(br, {}),
        )
    }
    // 카드 수정
    else if (msg[0].type === 6) {
        children.push(
            C(strong, {children: ['수정:']}),
            C(br, {}),
            '- 리스트[제목: ',
            C(strong, {children: [`${msg[0].data[0]}`]}),
            ']',
            C(br, {}),
            '- 카드[제목: ',
            C(strong, {children: [`${msg[0].data[1]}`]}),
            ']',
            C(br, {}),
        )
    }

    return (
        C(div, {className: 'commitCard', children: [
            C(span, {children: children}),
            C(time, {children: [getTimeDifference(msg[0].time)]}),
        ]})
    )
}


function getTimeDifference(pastDate) {
    const now = new Date();
    const diffMs = now - pastDate; // 시간 차이 (밀리초 단위)

    // 단위를 계산
    const diffSeconds = Math.floor(diffMs / 1000); // 초 단위
    const diffMinutes = Math.floor(diffSeconds / 60); // 분 단위
    const diffHours = Math.floor(diffMinutes / 60); // 시간 단위
    const diffDays = Math.floor(diffHours / 24); // 일 단위

    // 조건별로 결과 반환
    if (diffMinutes < 1) {
        return `${diffSeconds}초 전`;
    } else if (diffHours < 1) {
        return `${diffMinutes}분 전`;
    } else if (diffDays < 1) {
        return `${diffHours}시간 전`;
    } else {
        return `${diffDays}일 전`;
    }
}
