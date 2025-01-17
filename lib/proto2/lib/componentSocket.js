const socketList = {};

// Open socket
function openSocket(portNum, setState) {
    if (socketList[portNum]) {
        console.error(`소켓 포트번호 ${portNum} 가 이미 열려있습니다.`);
        return false;
    } else {
        socketList[portNum] = setState;
        console.log(`소켓 포트번호 ${portNum} 가 성공적으로 열렸습니다.`);
        return true;
    }
}

// Close socket
function closeSocket(portNum) {
    if (socketList[portNum]) {
        delete socketList[portNum];
        console.log(`소켓 포트 ${portNum} 가 성공적으로 닫혔습니다.`);
        return true;
    } else {
        console.error(`소켓 포트 ${portNum} 가 존재하지 않습니다.`);
        return false;
    }
}

// Send message
function sendMessage(portNum, msg) {
    if (socketList[portNum]) {
        socketList[portNum]([msg]);
        console.log(` ${portNum} 포트로 메시지 송신:`, msg);
        return true;
    } else {
        console.error(`소켓 포트 ${portNum} 가 존재하지 않습니다.`);
        return false;
    }
}

export { openSocket, closeSocket, sendMessage };