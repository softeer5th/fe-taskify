// Props 적용
function adaptProps(component, templateId, props) {
    // props가 있는 경우에만
    if (Object.keys(props).length>0) {
        if (templateId==='column-template') {
            component.querySelector('.column-name').textContent = props.title || 'Default Title';
            component.querySelector('.card-count').textContent = props.cardCount || 0;
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

// 타겟 엘리먼트에 템플릿 렌더링하기
async function renderTemplate(templateFile, templateId, targetId, props) {
    const templateContent = await loadTemplate(templateFile, templateId, props);
    if (templateContent) {
        const target = document.getElementById(targetId);
        target.appendChild(templateContent);
    }
}


renderTemplate('./html/column_template.html', 'column-template', 'column-area', {title:"해야할 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {title:"하고 있는 일", cardCount:"0",});
renderTemplate('./html/column_template.html', 'column-template', 'column-area', {title:"완료한 일", cardCount:"0",});