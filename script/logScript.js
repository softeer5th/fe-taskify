import LogLayerHTML, { DeleteLogHTML, EmptyLogHTML, LogHTML } from "../components/log.js";
// import { createDeleteModal } from "./task.js";

let logs = [];

export function generateLogsHTML(logs) {
    const frag = document.createDocumentFragment();
    logs.forEach((el) => {
        const logElement = document.createElement("li");
        logElement.innerHTML = LogHTML(el);

        frag.appendChild(logElement);
    });

    return frag;
}

function getLogs() {
    return [...logs];
}

export function setLog(log) {
    if (logs.length >= 5) {
        logs = [...logs.slice(1), log];
    } else logs.push(log);
}

function deleteLog() {
    logs = [];
}

export function renderingLogList(logLayerElement) {
    const logListElement = logLayerElement.querySelector('#log_layer_list');

    if(logs.length === 0) {
        const logElement = document.createElement('li');
        logElement.setAttribute('id', 'log_layer_empty');
        logElement.innerHTML = EmptyLogHTML();  
        logListElement.appendChild(logElement)
    }
    else {
        const logFragmentElement = generateLogsHTML(logs);
        logListElement.appendChild(logFragmentElement)
        const logFooterElement = document.createElement('div');
        logFooterElement.innerHTML = DeleteLogHTML();
        logFooterElement.setAttribute('id', 'log_layer_footer')
        const deleteButton = logFooterElement.getElementsByTagName('button')[0];
        // deleteButton.addEventListener('click', ()=>createDeleteModal("모든 사용자 활동 기록을 삭제할까요?", ()=>{
        //     deleteLog();
        //     clearLogList();
        // }))
        logLayerElement.appendChild(logFooterElement)
    }
}


function clearLogList() {
    const logLayer = document.querySelector('#log_layer')
    const logListElement = logLayer.querySelector("#log_layer_list");
    
    while (logListElement.hasChildNodes()) {
        logListElement.removeChild(logListElement.firstChild);
    }
    
    const logElement = document.createElement("li");
    logElement.setAttribute("id", "log_layer_empty");
    logElement.innerHTML = EmptyLogHTML();
    logListElement.appendChild(logElement);
    logLayer.removeChild(logLayer.querySelector('#log_layer_footer'))

}


export function createLogLayerElement() {
    const logLayer = document.createElement('div');
    logLayer.setAttribute('id', 'log_layer');
    logLayer.setAttribute('class', 'surface-default rounded-200 shadow-floating');
    logLayer.innerHTML = LogLayerHTML();

    const closeButton = logLayer.getElementsByTagName('button')[0];
    closeButton.addEventListener('click', ()=>{
        document.body.removeChild(logLayer);
    })
    
    renderingLogList(logLayer);

    return logLayer
}