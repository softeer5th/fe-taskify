// TODO: 파일 따로 분리
const CATEGORY = {
    todo: '해야할 일',
    doing: '하고 있는 일',
    done: '완료한 일',
};

export const toggleClockBtn = () => {
    const clockBtn = document.querySelector('#clock-btn');
    const activityList = document.querySelector('.activity__list');
    clockBtn.addEventListener('click', (e) => {
        activityList.classList.toggle('clock__toggle');
    });
}

export const renderRecords = () => {
    const recordsFromStorage = JSON.parse(localStorage.getItem('records')) || [];

    if(recordsFromStorage.length === 0) {
        activityList.appendChild(document.createElement('li')).textContent = '사용자 활동 기록이 없습니다.';
        return ;
    }
    
    const activityContianer = document.createElement('ul');
    const activityList = document.querySelector('.activity__list');
    recordsFromStorage.forEach((record, index) => {
        const recordContainer = document.createElement('li');
        recordContainer.className = 'record__container';
        
        const textBox = document.createElement('div');
        textBox.className = 'text__box';

        const userImg = document.createElement('img');
        userImg.src = '/assets/user.png';
        const username = document.createElement('p');
        username.textContent = '@이름이용';
        const content = document.createElement('p');
        let type;
        switch (record.type) {
            case 'add':
                type = '추가';
                break;
            case 'move':
                type = '이동';
                break;
            case 'update':
                type = '변경';
                break;
            case 'register':
                type = '등록';
                break;
            case 'delete':
                type = '삭제';
                break;
            default:
                type = '알 수 없음';
                break;
        }
        content.innerHTML = `<strong>${record.title}</strong>을(를) <strong>${CATEGORY[record.beforeCategory]}</strong>에서 <strong>${CATEGORY[record.afterCategory]}</strong>으로 <strong>${type}</strong> 하였습니다.`;
        const time = document.createElement('p');
        time.textContent = `3분전`;

        textBox.appendChild(username);
        textBox.appendChild(content);
        textBox.appendChild(time);
        recordContainer.appendChild(userImg);
        recordContainer.appendChild(textBox);
        activityContianer.appendChild(recordContainer);
    });

    activityList.appendChild(activityContianer);
}
