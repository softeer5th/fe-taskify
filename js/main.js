import { addCard, delCard  } from "./column_action.js";

// 탬플릿에 Props 적용
function adaptProps(component, templateId, props) {
    // props가 있는 경우에만
    if (Object.keys(props).length>0) {
        if (templateId==='column-template') {
            component.querySelector('#column-id').id += props.id;
            component.querySelector('.column-name').textContent = props.title || 'Default Title';
            component.querySelector('#card-list').id += props.id;
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


function adaptEventListener(targetId, props) {
    if (targetId==="column-area") {
        const parentElement = document.querySelector('#column-id'+props.id);
        parentElement.querySelector('#add-card-button').addEventListener('click', (event)=> {
            addCard(props.id);
        });
        parentElement.querySelector('#delete-cards-button').addEventListener('click', (event)=> {
            delCard(props.id);
        });
    }
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


renderTemplate('./html/column_template.html', 'column-template', 'column-area', {id:0, title:"해야할 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {id:1, title:"하고 있는 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {id:2, title:"완료한 일", cardCount:"0",});