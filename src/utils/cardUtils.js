import { ColumnCard } from '../components/Card/ColumnCard.js';

export function showCardList(element,cardList){
    const fragment = document.createDocumentFragment();
    cardList.map((item)=>{
        fragment.appendChild(ColumnCard({
            title:item.title,
            type: item.type,
            content: item.content,
            author: item.author,
            editId: 'card-edit',
            deleteId: 'card-delete-toggle',
            checkId: "card-add",
            closeId: "card-add-toggle",
        
        }))
        
    })
    element.appendChild(fragment);
}

export function addCardToggle({addForm,headerColumn}){
    if (addForm) {
        addForm.remove();
    } else {
        const newForm = ColumnCard({
            type: "add-card",
            title: "제목을 입력하세요.",
            content: "내용을 입력하세요",
            checkId: "card-add",
            closeId: "card-add-toggle",
            addText:"등록",
            closeText: "취소",
        });
        
        headerColumn.insertAdjacentElement('afterend', newForm); 
    }
    return;
}

export function addCard({titleInput,contentInput,addForm,headerColumn}){
    const title = titleInput.value;
    const content = contentInput.value;
    
    if (title && content) {
        addForm.remove()
        const newCard =ColumnCard({
            title,
            content ,
            author:"author by web" ,                
            editId: 'card-edit',
            deleteId: 'card-delete-toggle',
            closeText:"취소",
            checkId:"삭제"
        })
        headerColumn.insertAdjacentElement('afterend', newCard); 
    }

}

export function deleteCardToggle(){
    
}

export function deleteCard(){
    
}