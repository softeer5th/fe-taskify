import { timeCalculator } from "../script/utils.js";

export default function LogLayerHTML() {
    return `
            <div id="log_layer_header">
                <p class="text-strong display-bold16">사용자 활동 기록</p>
                <button>
                    <img src="/public/icon/closed_default.svg" width="16" height="16" />
                    <span class="display-bold14 text-default">
                        닫기
                    </span>
                </button>
            </div>
            <ol id="log_layer_list">
            </ol>
        `;
}

export function EmptyLogHTML() {
    return `
        <p class="text-weak display-medium14">사용자 활동 기록이 없습니다.</p>
    `;
}

export function LogHTML(log) {
    const { task, type: actionType, updated, destination } = log;
    const { title, content, column, created } = task;
    const { time, type: timeType } = timeCalculator(updated, new Date());

    function addTemplate({ title, column }) {
        return `<span>${title}</span>을(를) <span>${column}</span>에서 <span>등록</span>하였습니다.`;
    }

    function removeTemplate({ title, column }) {
        return `<span>${title}</span>을(를) <span>${column}</span>에서 <span>삭제</span>하였습니다.`;
    }

    function updateTemplate({ title }) {
        return `<span>${title}</span>을(를) <span>변경</span>하였습니다.`;
    }

    function moveTemplate({ title, column, destination }) {
        return `<span>${title}</span>을(를) <span>${column}</span>에서 <span>${destination}</span>으로 <span>이동</span>하였습니다.`;
    }

    let template = ``;

    switch (actionType) {
        case "add":
            template = addTemplate({ title, column });
            break;
        case "remove":
            template = removeTemplate({ title, column });
            break;
        case "update":
            template = updateTemplate({ title });
            break;
        case "move":
            template = moveTemplate({ title, column, destination });
    }

    return `
            <div>
                <div class="log_profile border-default surface-alt">
                </div>
            </div>
            <div>
                <p class="text-default display-medium14">나</p>
                <p class="text-default display-medium14">${template}</p>
                <p class="text-weak display-medium12">${time}${timeType} 전</p>
            </div>
    `;
}

export function DeleteLogHTML() {
    return `
            <button class="display-bold14 text-danger">기록 전체 삭제</button>
        `;
}
