export function createNewId () {
    const now = new Date(); // 현재 시간
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formatted = `${year}${month}${date}${hours}${minutes}${seconds}`;
    return formatted;
}

export function calTimePassed(date1, date2) {
    const diffMs = Math.abs(date1 - date2);
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSeconds < 60) {
        return `방금 전`
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`; // 1시간 이내
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`; // 1일 이내
    } else {
        return `${diffDays}일 전`; // 1일 이후
    }
}

function cardToObj(card) {
    let id = card.id.slice(7);
    let title = card.querySelector('.card-title').textContent;
    let content = card.querySelector('.card-content').textContent;
    const cardData = {
        "id": id,
        "title": title,
        "content": content
    }
    return cardData;
}

function columnToObj(column) {
    let title = column.querySelector('.column-name').textContent;
    let cards = column.querySelectorAll('.card-id');
    let cardList = Array();
    [...cards].forEach((card) => {
        cardList.push(cardToObj(card));
    })
    const columnData = {
        "title": title,
        "cardList": cardList
    }
    return columnData;
}

export function todoToObj() {
    let columns = document.querySelectorAll(".column-id");
    let columnList = Array();
    [...columns].forEach((column)=>{
        columnList.push(columnToObj(column));
    })
    return columnList;
}

export function todoToJson(columnListData, historyData) {
    let todoJsonData = {
        "todo" : columnListData,
        "history": historyData
    };
    return JSON.stringify(todoJsonData);
}

export function todoFromJson(columnJson) {
    return JSON.parse(columnJson);
}