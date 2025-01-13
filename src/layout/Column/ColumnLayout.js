import { ColumnHeader } from '../../components/Column/ColumnHeader.js';
import { showCardList } from '../../utils/cardUtils.js';
import { loadCss } from '../../utils/loadcss.js'

export function ColumnLayout(data) {
    const columnLayout = document.createElement('div')
    columnLayout.className = "column-layout"

   // 각각의 Column에 들어갈 컴포넌트 생성
   const todoColumn = ColumnHeader({
    title: "해야할 일",
    badgeContent: data.todos.length,
    plusEvent: () => {},
    closedEvent: () => {}
});

const inProgressColumn = ColumnHeader({
    title: "하고 있는 일",
    badgeContent: data.progress.length,
    plusEvent: () => {},
    closedEvent: () => {}
});

const doneColumn = ColumnHeader({
    title: "완료한 일",
    badgeContent: data.done.length,
    plusEvent: () => {},
    closedEvent: () => {}
});

    columnLayout.innerHTML=`
        <div class="column-container">
            <div class="column-box" id="todo-column"></div>
            <div class="column-box" id="in-progress-column"></div>
            <div class="column-box" id="done-column"></div>
        </div>
    `;
    
     // 각 column-box에 컴포넌트를 추가
    const columnBoxes = columnLayout.querySelectorAll('.column-box');
    columnBoxes[0].insertAdjacentElement("beforeend",todoColumn);
    columnBoxes[1].insertAdjacentElement("beforeend",inProgressColumn);
    columnBoxes[2].insertAdjacentElement("beforeend",doneColumn);

    showCardList(columnBoxes[0],data.todos);
    showCardList(columnBoxes[1],data.progress);
    showCardList(columnBoxes[2],data.done);



    loadCss('../src/layout/Column/Column.css')
    return columnLayout
}

