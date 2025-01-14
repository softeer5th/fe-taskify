import { addCard, delAllCard, updateChildCount  } from "./column_action.js";
import { editCard, delCard, startDragCard, moveCard, finishDragCard, isDragging, moveCardIllusion, isEditing } from "./card_action.js";

// 탬플릿에 Props 적용
function adaptProps(component, templateId, props) {
    // props가 있는 경우에만
    if (Object.keys(props).length>0) {
        if (templateId==='column-template') {
            component.querySelector('#column-id').id += props.columnId;
            component.querySelector('.column-name').textContent = props.title || 'Default Title';
            component.querySelector('#card-list').id += props.columnId;
            updateChildCount(component.querySelector('.column-id'));
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

    addListener(parentElement.querySelector('#add-card-button'), (event)=>{
        if (event.type === "click") {
            addCard(props.columnId);
        } else if (event.type === "mousemove") {
            moveCard(event, clone);
        }
    })
    addListener(parentElement.querySelector('#delete-cards-button'), (event)=>{
        if (event.type === "click") {
            delAllCard(props.columnId);
        } else if (event.type === "mousemove") {
            moveCard(event, clone);
        }
    });

    addListener(parentElement,(event)=>{
        if (event.type === "mousemove") {
            moveCard(event, clone);
            moveCardIllusion(parentElement, clone);
        }
    })

    // MutationObserver 설정
    const observer = new MutationObserver(() => {
        updateChildCount(parentElement); // DOM 변경 시 자식 요소 수 업데이트
    });

    // MutationObserver를 관찰할 대상과 옵션 설정
    observer.observe(parentElement.querySelector('.card-list'), {
        childList: true, // 자식 리스트의 변경 감지
    });
}

// 카드 이벤트 적용
export function setEventForCard(props) {
    const childElement = document.querySelector("#card-id"+props.cardId);
    const parentElement = childElement.parentElement;
    // 카드 수정 버튼에 이벤트 추가
    addListener(childElement.querySelector('#edit-card-button'), (event)=>{
        if (event.type === "click") {
            editCard(props.cardId);
        } else if (event.type === "mousemove") {
            moveCard(event, clone);
        }
    })
    // 카드 삭제 버튼에 이벤트 추가
    addListener(childElement.querySelector('#del-card-button'), (event)=>{
        if (event.type === "click") {
            delCard(props.cardId);
        } else if (event.type === "mousemove") {
            moveCard(event, clone);
        }
    })
    // 카드 드래그
    addListener(childElement, (event)=>{
        if (event.type === "mousedown") {
            if (!clone) {
                clone = childElement.cloneNode(true);
                clone.classList.add('dragging');
                startDragCard(event, childElement, clone, props.cardId);
            }
        } else if (event.type === "mousemove") {
            moveCard(event, clone);
            moveCardIllusion(parentElement, clone);
        }
    });
}

// 타겟 엘리먼트에 템플릿 렌더링하기
export async function renderTemplate(templateFile, templateId, targetId, props) {
    const templateContent = await loadTemplate(templateFile, templateId, props);
    if (templateContent) {
        const target = document.getElementById(targetId);
        target.appendChild(templateContent);
        adaptEventListener(targetId, props);
    }
}

export function addListener(element, listener) {
    if (!eventListeners.has(element)) {
      eventListeners.set(element, []); // 요소에 대한 리스너 배열 초기화
    }
    eventListeners.get(element).push(listener); // 배열에 리스너 추가
}

function triggerListeners(event, startElement) {
    let currentElement = startElement;

    while (currentElement) {
        if (eventListeners.has(currentElement)) {
            // console.log(currentElement);
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
let clone = null;

addListener(document.body, (event)=>{
    moveCard(event, clone);
})

document.addEventListener('click', (event) => {
    triggerListeners(event, event.target);
});

document.addEventListener('mousedown', (event) => {
    if (!isEditing) {
        triggerListeners(event, event.target);
    }
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        triggerListeners(event, event.target)
    }
});

document.addEventListener('mouseup', (event) => {
    if (isDragging) {
        finishDragCard(clone);
        clone = null;
    }
});

renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:0, title:"해야할 일"});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:1, title:"하고 있는 일"});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {columnId:2, title:"완료한 일"});
