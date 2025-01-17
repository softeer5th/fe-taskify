import { MAX_TASKS } from "../../script/lib/constant";

export default function ColumnComponent() {

    // Column 컴포넌트 템플릿
    function template({ title }) {
        return `
            <h3 class="column_header text-bold display-bold16">
                <span class="column_title_container">
                    <span class="column_title">${title}</span>
                    <span class="column_task_counter text-weak display-medium12 border-default rounded-100">0</span>
                </span>
                <span class="column_button_container">
                    <button>
                        <img draggable="false" width="24" height="24" src="/public/icon/plus.svg" />
                    </button>
                    <button>
                        <img draggable="false" width="24" height="24" src="/public/icon/closed.svg" />
                    </button>
                </span>
            </h3>
            <div class="card_add"></div>
            <ol class="card_list">
    
            </ol>
        `;
    }

    // Column 컴포넌트 렌더링 함수
    function render(column) {
        const columnElement = document.createElement("li");
        columnElement.classList = "column";
        columnElement.setAttribute("index", column.index);
        columnElement.innerHTML = template({ title: column.title });

        return columnElement;
    }

    // 생성된 Column에 이벤트 등록 함수
    // handleAdd : + 버튼을 눌러서 Task를 생성하기 위한 Form을 생성하는 Callback
    function addListener(
        columnElement,
        handleAdd,
        handleDrop,
        handleDragEnter,
        handleDragLeave,
        handleBlur,
        handleContextMenu
    ) {
        const [addButton, removeButton] =
            columnElement.getElementsByTagName("button");
        const columnIdx = Number(columnElement.getAttribute("index"));
        const formContainer =
            columnElement.getElementsByClassName("card_add")[0];
        
        addButton.addEventListener("click", () =>
            handleAdd(formContainer, columnIdx)
        );

        const listElement = columnElement.querySelector(".card_list");
        
        listElement.addEventListener("dragover", (e) => e.preventDefault());
        listElement.addEventListener("drop", handleDrop);
        listElement.addEventListener("dragenter", handleDragEnter);
        listElement.addEventListener("dragleave", handleDragLeave);

        const titleElement = columnElement.querySelector('.column_title_container');
        const editElement = renderEditForm(titleElement, (title)=>handleBlur(columnIdx, title))
        
        titleElement.addEventListener('contextmenu', handleContextMenu)
        titleElement.addEventListener('dblclick', ()=>{
            titleElement.parentNode.replaceChild(editElement, titleElement);
            editElement.focus();
        })
    }

    function rerenderHeader(idx, n) {
        const counterElement = document.body.querySelectorAll(
            ".column_task_counter"
        )[idx];
        if (n > MAX_TASKS) counterElement.textContent`${MAX_TASKS}+`;
        else counterElement.textContent = n;
    }

    function renderEditForm(containerElement, handleBlur) {
        const titleElement = containerElement.querySelector('.column_title');
        const title = titleElement.textContent;
        const inputElement = document.createElement('input');
        inputElement.classList = 'border-default surface-default display-medium14 text-strong'
        inputElement.value = title;

        inputElement.addEventListener('blur', (e)=>{
            titleElement.textContent = e.target.value;
            inputElement.parentNode.replaceChild(containerElement, inputElement);
            handleBlur(e.target.value);
        });

        return inputElement;
    }

    function removeSelf(columnElement) {
        columnElement.remove()
    }

    return {
        render,
        addListener,
        rerenderHeader,
        removeSelf,
    };
}