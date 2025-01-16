const CATEGORY = {
    todo: '해야할 일',
    doing: '하고 있는 일',
    done: '완료한 일',
};

export const getActivityMessage = (record) => {
    const title = `<strong style="color: black;">${record.title}</strong>`;
    const beforeCategory = `<strong style="color: black;">${CATEGORY[record.beforeCategory]}</strong>`;
    const afterCategory = `<strong style="color: black;">${CATEGORY[record.afterCategory]}</strong>`;

    switch (record.type) {
        case 'add':
            return `${title}을(를) <strong style="color: black;">${CATEGORY[record.category]}</strong>에 <strong style="color: black;">등록</strong>하였습니다.`;
        case 'move':
            return `${title}을(를) ${beforeCategory}에서 ${afterCategory}으로 <strong style="color: black;">이동</strong>하였습니다.`;
        case 'edit':
            return `${title}을(를) <strong style="color: black;">변경</strong>하였습니다.`;
        case 'delete':
            return `${title}을(를) <strong style="color: black;">${CATEGORY[record.category]}</strong>에서 <strong style="color: black;">삭제</strong>하였습니다.`;
        default:
            return `${title}을(를) ${beforeCategory}에서 ${afterCategory}으로 ${type} 하였습니다.`;
    }
};

export const timeDifference = (timestamp) => {
    const now = new Date();
    const recordTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - recordTime) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (minutes === 0) {
        return '방금 전';
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else {
        return `${days}일 전`;
    }
};