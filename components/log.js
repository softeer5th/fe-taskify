import { timeCalculator } from "../script/utils.js";

export function LogComponent(columns) {
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
        const { task, type: actionType, updated, destination } = log;
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
                template = templateMove({ title, originTitle, destinationTitle });
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
                    <p class="text-weak display-medium12">${time}${timeType} 전</p>
                </div>
        `;
    }

    function templateFooter() {
        return `
                <button class="display-bold14 text-danger">기록 전체 삭제</button>
            `;
    }

    function render(logs) {
        const logElement = document.createElement('div');
        logElement.setAttribute('id', 'log_layer');
        logElement.setAttribute('class', 'surface-default rounded-200 shadow-floating');
        logElement.innerHTML = template();

        const logListElement = logElement.querySelector('#log_layer_list');

        if(!logs || logs.length === 0)   {
            const emptyLogElement = renderEmpty();
            logListElement.appendChild(emptyLogElement);
        }
        else {
            const logFragElement = document.createDocumentFragment();
            logs.forEach(el => {
                const logLiElement = renderLog(el);
                logFragElement.appendChild(logLiElement);
            })
            logListElement.append(logFragElement);

            const logFooterElement = document.createElement('div');
            logFooterElement.innerHTML = templateFooter();
            logFooterElement.setAttribute('id', 'log_layer_footer')
            logElement.appendChild(logFooterElement);
        }  

        return logElement;
    }

    function remove() {
        const logElement = document.body.querySelector('#log_layer');
        if(logElement) {
            document.body.removeChild(logElement);
        }
    }

    function renderEmpty() {
        const logElement = document.createElement('li');
        logElement.setAttribute('id', 'log_layer_empty');
        logElement.innerHTML = templateEmpty();

        return logElement
    }

    function renderLog(log) {
        const logLiElement = document.createElement('li');
        logLiElement.innerHTML = templateLog(log);

        return logLiElement;
    }

    function addEventListener(logElement, handleClose, handleClear) {
        const [closeButton, clearButton] = logElement.getElementsByTagName('button');

        closeButton.addEventListener('click', handleClose);

        if(clearButton) {
            clearButton.addEventListener('click', handleClear)
        }
    }

    function findColumnName(columnIdx) {
        return columns.find(el => el.index === columnIdx).title;
    }

    return {
        render,
        remove,
        addEventListener,
    }
}