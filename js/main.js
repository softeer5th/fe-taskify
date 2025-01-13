import { addCard, delAllCard  } from "./column_action.js";
import { editCard, delCard, startDragCard, moveCard, finishDragCard } from "./card_action.js";

// 탬플릿에 Props 적용
function adaptProps(component, templateId, props) {
    // props가 있는 경우에만
    if (Object.keys(props).length>0) {
        if (templateId==='column-template') {
            component.querySelector('#column-id').id += props.columnId;
            component.querySelector('.column-name').textContent = props.title || 'Default Title';
            component.querySelector('#card-list').id += props.columnId;
            if (props.cardCount) {
                if (parseInt(props.cardCount)>99) {
                    component.querySelector('.card-count').textContent = "99+";
                } else {
                    component.querySelector('.card-count').textContent = props.cardCount;
                }
            } else {
                component.querySelector('.card-count').textContent = props.cardCount || 0;
            }
        } else if (templateId==='card-template') {
            component.querySelector('#card-id').id += props.cardId;
            component.querySelector('.card-title').textContent = props.title;
            component.querySelector('.card-content').textContent = props.content;
        }
    }
    return component;
}

// 외부 템플릿 파일 가져와서 로드
async function loadTemplate(templateFile, templateId, props) {
    try {
        const response = await fetch(templateFile);
        const text = await response.text();
    
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        const template = tempDiv.querySelector(`#${templateId}`);
        if (template) {
            let component = template.content.cloneNode(true);
            // 템플릿 반환 전 props 적용
            component = adaptProps(component, templateId, props);
            return component;
        } else {
            console.error(`Template with id '${templateId}' not found.`);
        }
    } catch (error) {
        console.error('Error loading template:', error);
    }
    return null;
}

// 템플릿에 이벤트 리스너 적용
function adaptEventListener(targetId, props) {
    const regEx = /^card-list/;
    if (targetId==="column-area") {
        setEventForColumn(props);
    } else if (regEx.test(targetId)) {
        setEventForCard(props);
    }
}

// 칼럼 이벤트 적용
function setEventForColumn(props) {
    const parentElement = document.querySelector('#column-id'+props.columnId);

    addListener(parentElement.querySelector('#add-card-button'), (event, realTarget)=>{
        if (event.type === "click") {
            addCard(props.columnId);
        }
    })
    addListener(parentElement.querySelector('#delete-cards-button'), (event, realTarget)=>{
        if (event.type === "click") {
            delAllCard(props.columnId);
        }
    });
}

// 카드 이벤트 적용
function setEventForCard(props) {
    const parentElement = document.querySelector('#card-list'+props.columnId);
    const childElement = parentElement.querySelector("#card-id"+props.cardId);
    // 카드 수정 버튼에 이벤트 추가
    addListener(childElement.querySelector('#edit-card-button'), (event, realTarget)=>{
        if (event.type === "click") {
            editCard(props.columnId, props.cardId);
        }
    })
    // 카드 삭제 버튼에 이벤트 추가
    addListener(childElement.querySelector('#del-card-button'), (event, realTarget)=>{
        if (event.type === "click") {
            delCard(props.columnId, props.cardId);
        }
    })
    // 카드 드래그 시작
    addListener(childElement, (event, realTarget)=>{
        if (event.type === "mousedown") {
            if (!clone) {
                clone = realTarget.cloneNode(true);
                clone.classList.add('dragging');
                startDragCard(event, clone);
            }
        } else if (event.type === "mouseup") {
            finishDragCard(clone);
            clone = null;
        }
    });
    addListener(childElement, (event, realTarget)=>{
    })
}

// 타겟 엘리먼트에 템플릿 렌더링하기
export default async function renderTemplate(templateFile, templateId, targetId, props) {
    const templateContent = await loadTemplate(templateFile, templateId, props);
    if (templateContent) {
        const target = document.getElementById(targetId);
        target.appendChild(templateContent);
        adaptEventListener(targetId, props);
    }
}

let clone = null;   


// 마우스 이동
// document.addEventListener('mousemove', (event) => {
//     let realTarget = null;
//     if(realTarget = checkTarget(event.target, 'dragging')) {
//         moveCard(event, clone);
//     }
// });



function addListener(element, listener) {
    if (!eventListeners.has(element)) {
      eventListeners.set(element, []); // 요소에 대한 리스너 배열 초기화
    }
    eventListeners.get(element).push(listener); // 배열에 리스너 추가
}

function triggerListeners(event, startElement) {
    let currentElement = startElement;
    console.log(eventListeners);

    while (currentElement) {
        if (eventListeners.has(currentElement)) {
            const listeners = eventListeners.get(currentElement);
            if (listeners) {
                listeners.forEach((listener) => listener(event, currentElement)); // 등록된 모든 리스너 실행
                break;
            }
        }
        currentElement = currentElement.parentElement; // 부모로 이동
    }
}

const eventListeners = new WeakMap();



document.addEventListener('click', (event) => {
    triggerListeners(event, event.target);
});

document.addEventListener('mousedown', (event) => {
    triggerListeners(event, event.target);
});

document.addEventListener('mouseup', (event) => {
    triggerListeners(event, event.target);
});

renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:0, title:"해야할 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:1, title:"하고 있는 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:2, title:"완료한 일", cardCount:"0",});