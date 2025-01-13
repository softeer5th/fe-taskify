import { ColumnCard } from '../components/Card/ColumnCard.js';

export function showCardList(element,cardList){
    const fragment = document.createDocumentFragment();
    cardList.map((item)=>{
        fragment.appendChild(ColumnCard({
            title:item.title,
            type: item.type,
            content: item.content,
            author: item.author,
        
        }))
        
    })
    element.appendChild(fragment);
}