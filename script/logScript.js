import { LogHTML } from "../components/log.js";

let userLogs = [];

export function generateLogsHTML(logs) {
    const frag = document.createDocumentFragment();
    logs.forEach((el) => {
        const logElement = document.createElement("li");
        logElement.innerHTML = LogHTML(el);
        
        frag.appendChild(logElement);
    });
    
    return frag;
}

export function getLogs() {
    return [...userLogs];
}

export function setLog(log) {
    if(userLogs.length >= 5) {
        userLogs = [...userLogs.slice(1), log]
    }
    else userLogs.push(log)
}