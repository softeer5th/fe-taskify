import { getActivityMessage } from "../../utils/index.js";

export const toggleClockBtn = () => {
    const clockBtn = document.querySelector('#clock-btn');
    const activityList = document.querySelector('.activity__list');
    clockBtn.addEventListener('click', (e) => {
        activityList.classList.toggle('clock__toggle');
    });

    const activityCloseBtn = document.querySelector('.activity__close__btn');
    activityCloseBtn.addEventListener('click', (e) => {
        activityList.classList.toggle('clock__toggle');
    });
}

export const removeRecords = () => {
        localStorage.removeItem('records');
        renderRecords();
}

export const renderRecords = () => {
    const recordsFromStorage = JSON.parse(localStorage.getItem('records')) || [];

    const activityList = document.querySelector('.activity__list');
    const activityListUl = document.querySelector('.activity__list > ul');
    const removeContainer = document.querySelector('.record__delete__container');
    const noRecordContainer = document.querySelector('.no__record__container');
    if (activityListUl) {
        activityListUl.remove();
        removeContainer.remove();
    }


    if(recordsFromStorage.length === 0) {
        const noRecordContainer = document.createElement('li');
        noRecordContainer.textContent = '사용자 활동 기록이 없습니다.';
        noRecordContainer.classList.add('medium14', 'no__record__container');
        activityList.appendChild(noRecordContainer)
        return ;
    }
    if(noRecordContainer) {
        noRecordContainer.remove();
    }

    const activityContianer = document.createElement('ul');

    recordsFromStorage.forEach((record, index) => {
        const recordContainer = document.createElement('li');
        recordContainer.className = 'record__container';
        
        const textBox = document.createElement('div');
        textBox.className = 'text__box';

        const userImg = document.createElement('img');
        // userImg.src = '/assets/user.png';
        userImg.src = 'https://s3-alpha-sig.figma.com/img/238e/defe/eede02d1a80e6ccab7a760738eef7e21?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oft77sJUvrzVXcj~vC8LlQnduFFgr-UQ~-VpzAOiAeeVMl7Np5J-~E4nlgwLH36pgPx0NsfLiGZnQXpBk21sgXkUMtMeqYCrTmHqzQtwIx~w83u-qSDh8GxxjFB37u0o5GONz6UnD~0w-lEYf8M8v3W9a2UzdzoqfPyOf2RC2aJQUzhd0jA-moETtmyQH02c~z3DIE1r5XmirKviUD-XG5VjbtOXqIQ1FH6Kwj9mIpjiHF3hmIqy7xIGCAgnCU9Xox9mmmY50WYB7-J5KtFGw8u1UX46lFdPPlOS4DNraA5Wgn7S7NmT82-yK1ZCkeAhL8VyRvh7AAvvajt-0g-SsA__';
        const username = document.createElement('p');
        username.textContent = '@이름이용';
        username.className = 'medium14';
        username.style.color = '#6E7191';
        const content = document.createElement('p');
        content.className = 'medium14';
        content.style.color = '#6E7191';

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
            default:
                type = '알 수 없음';
                break;
        }
        content.innerHTML = getActivityMessage(record);
        const time = document.createElement('p');
        // TODO: 변경 필요
        time.textContent = `3분전`;
        time.className = 'medium12';
        time.style.color = '#A0A3BD';

        textBox.appendChild(username);
        textBox.appendChild(content);
        textBox.appendChild(time);
        recordContainer.appendChild(userImg);
        recordContainer.appendChild(textBox);
        activityContianer.appendChild(recordContainer);
    });

    activityList.appendChild(activityContianer);
    
    const recordDeleteContainer = document.createElement('div');
    recordDeleteContainer.className = 'record__delete__container';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '기록 전체 삭제';
    deleteBtn.className = 'bold14';
    deleteBtn.addEventListener(('click'), removeRecords);
    recordDeleteContainer.appendChild(deleteBtn);

    activityList.appendChild(recordDeleteContainer);
}
