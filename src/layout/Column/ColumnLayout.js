import { ColumnHeader } from '../../components/Column/ColumnHeader.js';
import { showCardList } from '../../utils/cardUtils.js';
import { loadCss } from '../../utils/loadcss.js'

export function ColumnLayout({todoModel,progressModel,doneModel}) {
    const columnLayout = document.createElement('div')
    columnLayout.className = "column-layout"

   // 각각의 Column에 들어갈 컴포넌트 생성
   const todoColumn = ColumnHeader({
    title: "해야할 일",
    badgeContent: todoModel.tasks.length,
    addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:todoModel
});

const inProgressColumn = ColumnHeader({
    title: "하고 있는 일",
    badgeContent: progressModel.tasks.length,
    addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:progressModel
});

const doneColumn = ColumnHeader({
    title: "완료한 일",
    badgeContent: doneModel.tasks.length,
     addId: "card-add-toggle",
    closeId: "card-close-toggle",
    model:doneModel
});

    columnLayout.innerHTML=`
        <div class="column-container">
            <div class="column-box" id="todo-column">
                <ol class="column-card-box"></ol>
            </div>
            <div class="column-box" id="in-progress-column">
                <ol class="column-card-box"></ol>
            </div>
            <div class="column-box" id="done-column">
                <ol class="column-card-box"></ol>
            </div>            
        </div>
    `;
    
     // 각 column-box에 컴포넌트를 추가
    const columnBoxes = columnLayout.querySelectorAll('.column-box');
    columnBoxes[0].insertAdjacentElement("afterbegin",todoColumn);
    columnBoxes[1].insertAdjacentElement("afterbegin",inProgressColumn);
    columnBoxes[2].insertAdjacentElement("afterbegin",doneColumn);




    const columnCardBoxes=columnLayout.querySelectorAll('.column-card-box');

    handleShowCardModel({columnBox:columnCardBoxes[0],model:todoModel});
    handleShowCardModel({columnBox:columnCardBoxes[1],model:progressModel});
    handleShowCardModel({columnBox:columnCardBoxes[2],model:doneModel});
    
    showCardList(columnCardBoxes[0],todoModel.tasks);
    showCardList(columnCardBoxes[1],progressModel.tasks);
    showCardList(columnCardBoxes[2],doneModel.tasks);


    loadCss('../src/layout/Column/Column.css')
    return columnLayout
}



export function handleShowCardModel({columnBox,model}){
    model.subscribe((task)=>{
        showCardList(columnBox,task);
    }   
    )
}