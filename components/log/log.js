import { timeCalculator } from "../../script/lib/utils.js";

export function LogComponent(columns, store, handleClear) {
    store.subscribe(rerender);
    const emptyElement = renderEmpty();
    const footerElement = renderFooter();

    function template() {
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

    function templateEmpty() {
        return `
            <p class="text-weak display-medium14">사용자 활동 기록이 없습니다.</p>
        `;
    }

    function templateLog(log) {
        const { task, type: actionType, updated, destination, logId } = log;
        const { title, content, column, created } = task;
        const { time, type: timeType } = timeCalculator(updated, new Date());

        const originTitle = findColumnName(column);

        function templateAdd({ title, originTitle }) {
            return `<span>${title}</span>을(를) <span>${originTitle}</span>에서 <span>등록</span>하였습니다.`;
        }

        function templateRemove({ title, originTitle }) {
            return `<span>${title}</span>을(를) <span>${originTitle}</span>에서 <span>삭제</span>하였습니다.`;
        }

        function templateUpdate({ title }) {
            return `<span>${title}</span>을(를) <span>변경</span>하였습니다.`;
        }

        function templateMove({ title, originTitle, destinationTitle }) {
            return `<span>${title}</span>을(를) <span>${originTitle}</span>에서 <span>${destinationTitle}</span>으로 <span>이동</span>하였습니다.`;
        }

        let template = ``;

        switch (actionType) {
            case "ADD":
                template = templateAdd({ title, originTitle });
                break;
            case "REMOVE":
                template = templateRemove({ title, originTitle });
                break;
            case "UPDATE":
                template = templateUpdate({ title });
                break;
            case "MOVE":
                const destinationTitle = findColumnName(destination);
                template = templateMove({
                    title,
                    originTitle,
                    destinationTitle,
                });
                break;
        }

        return `
                <div>
                    <div class="log_profile border-default surface-alt">
                    </div>
                </div>
                <div>
                    <p class="text-default display-medium14">나</p>
                    <p class="text-default display-medium14">${template}</p>
                    <p class="text-weak display-medium12 log_timestamp">${time}${timeType} 전</p>
                </div>
        `;
    }

    function templateFooter() {
        return `
                <button class="display-bold14 text-danger">기록 전체 삭제</button>
            `;
    }

    function renderFooter() {
        const logFooterElement = document.createElement("div");
        logFooterElement.innerHTML = templateFooter();
        logFooterElement.setAttribute("id", "log_layer_footer");
        const clearButton = logFooterElement.querySelector("button");
        clearButton.addEventListener("click", handleClear);

        return logFooterElement;
    }

    function render(logs) {
        const logElement = document.createElement("div");
        logElement.setAttribute("id", "log_layer");
        logElement.setAttribute(
            "class",
            "surface-default rounded-200 shadow-floating"
        );
        logElement.innerHTML = template();

        const closeButton = logElement.querySelector("button");
        closeButton.addEventListener("click", () => removeSelf());

        const logListElement = logElement.querySelector("#log_layer_list");

        if (!logs || logs.length === 0) {
            logElement.appendChild(emptyElement);
        } else {
            const logFragElement = document.createDocumentFragment();
            logs.forEach((el) => {
                const logLiElement = renderLog(el);
                logFragElement.appendChild(logLiElement);
            });
            logListElement.append(logFragElement);
            logElement.appendChild(footerElement);
        }

        return logElement;
    }

    function removeSelf() {
        const logElement = document.body.querySelector("#log_layer");
        logElement.remove();
    }

    function renderEmpty() {
        const logElement = document.createElement("div");
        logElement.setAttribute("id", "log_layer_empty");
        logElement.innerHTML = templateEmpty();

        return logElement;
    }

    function renderLog(log) {
        const logLiElement = document.createElement("li");
        logLiElement.setAttribute("logid", log.logId);
        logLiElement.innerHTML = templateLog(log);

        return logLiElement;
    }

    function rerenderLog(log, logElement) {
        const updated = log.updated;
        const timestamp = logElement.querySelector(".log_timestamp");

        const { time, type: timeType } = timeCalculator(updated, new Date());
        timestamp.textContent = `${time}${timeType} 전`;
    }

    function rerender(logs) {
        const logLayerElement = document.body.querySelector("#log_layer");

        if (!logLayerElement) return;

        const logListElement = logLayerElement.querySelector("#log_layer_list");

        const currentLogWithId = [...logListElement.children].map((el) => {
            return {
                logId: Number(el.getAttribute("logid")),
                element: el,
            };
        });

        if (logs.length == 0) {
            logListElement.innerHTML = "";
            logLayerElement.removeChild(footerElement);
            logLayerElement.appendChild(emptyElement);
        } else {
            if (logListElement.children.length === 0) {
                logLayerElement.removeChild(emptyElement);
                logLayerElement.appendChild(footerElement);
            }
            const logFragElement = document.createDocumentFragment();
            logs.forEach((log) => {
                const logId = log.logId;

                const matchedLog = currentLogWithId.find(
                    (log) => log.logId === logId
                );

                if (matchedLog) {
                    logFragElement.appendChild(matchedLog.element);
                    rerenderLog(log, matchedLog.element);
                } else {
                    const logLiElement = renderLog(log);
                    logFragElement.appendChild(logLiElement);
                }
            });
            logListElement.append(logFragElement);
        }
    }

    function findColumnName(columnIdx) {
        return columns.find((el) => el.index === columnIdx).title;
    }

    return {
        render,
        removeSelf,
    };
}
