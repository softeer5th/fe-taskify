import { addCard, delAllCard, updateChildCount, changeColumnName, completeColumnName, delColumn, toggleColumnShadow  } from "./column_action.js";
import { editCard, delCard, startDragCard, moveCard, moveCardIllusion } from "./card_action.js";
import { deleteColumnButton } from "./delete_column_button.js";
import { addListener } from "./event_listeners.js";
import { getClone, loadData, setClone } from "./store.js";

// 탬플릿에 Props 적용
function adaptProps(component, templateId, props) {
    // props가 있는 경우에만
    if (Object.keys(props).length>0) {
        if (templateId==='column-template') {
            component.querySelector('#column-id').id += props.columnId;
            component.querySelector('.column-name').textContent = props.title || 'Default Title';
            component.querySelector('#card-list').id += props.columnId;
            if (!(props.isDefault || false)) {
                component.querySelector('.column-header-right').prepend(deleteColumnButton());
            }
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
    if (!props.isDefault) {
        addListener(parentElement.querySelector('#delete-column-button'), (event) => {
            if (event.type === 'click') {
                delColumn(props.columnId);
            }
        });
    }
    addListener(parentElement.querySelector('#add-card-button'), (event)=>{
        if (event.type === "click") {
            addCard(props.columnId);
        } else if (event.type === "mousemove") {
            moveCard(event, getClone());
        }
    })
    addListener(parentElement.querySelector('#delete-cards-button'), (event)=>{
        if (event.type === "click") {
            delAllCard(props.columnId);
        } else if (event.type === "mousemove") {
            moveCard(event, getClone());
        }
    });

    addListener(parentElement,(event)=>{
        if (event.type === "mousemove") {
            moveCard(event, getClone());
            moveCardIllusion(event, parentElement, getClone());
        }
    })

    addListener(parentElement.querySelector('.column-name'), (event)=>{
        if (event.type === "dblclick") {
            changeColumnName(event);
        } else if (event.type === 'keydown') {
            if (event.key === 'Enter') {
                completeColumnName();
            }
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
            moveCard(event, getClone());
        }
    })
    // 카드 삭제 버튼에 이벤트 추가
    addListener(childElement.querySelector('#del-card-button'), (event)=>{
        if (event.type === "click") {
            delCard(props.cardId);
        } else if (event.type === "mousemove") {
            moveCard(event, getClone());
        }
    })
    // 카드 드래그
    addListener(childElement, (event)=>{
        if (event.type === "mousedown") {
            if (!getClone()) {
                setClone(childElement.cloneNode(true));
                getClone().classList.add('dragging');
                startDragCard(event, childElement, getClone(), props.cardId);
            }
        } else if (event.type === "mousemove") {
            moveCard(event, getClone());
            moveCardIllusion(event, parentElement, getClone());
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

// MutationObserver 설정
const observer = new MutationObserver(() => {
    toggleColumnShadow();
});

// MutationObserver를 관찰할 대상과 옵션 설정
observer.observe(document.querySelector('#column-area'), {
    attributes: true,
    childList: true,
});

const element = document.querySelector('#column-area');

const resizeObserver = new ResizeObserver((entries) => {
    toggleColumnShadow();
});

// 요소 크기 변경 감지 시작
resizeObserver.observe(element);

loadData();
