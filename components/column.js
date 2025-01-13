export default function ColumnComponent() {
    
    // Column 컴포넌트 템플릿
    function template({title}) {
        return `
            <h3 class="column_title text-bold display-bold16">
                ${title}
                <span class="column_task_counter text-weak display-medium12 border-default rounded-100">0</span>
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
        columnElement.setAttribute("class", "column");
        columnElement.setAttribute("index", column.index);
        columnElement.innerHTML = template({ title: column.title });

        return columnElement;
    }

    // 생성된 Column에 이벤트 등록 함수
    // handleAdd : + 버튼을 눌러서 Task를 생성하기 위한 Form을 생성하는 Callback 
    function addEventListener(columnElement, handleAdd) {
        const [addButton, removeButton] =
            columnElement.getElementsByTagName("button");
        const columnIdx = columnElement.getAttribute("index");
        const formContainer =
            columnElement.getElementsByClassName("card_add")[0];
        addButton.addEventListener("click", () =>
            handleAdd(formContainer, columnIdx)
        );
    }

    function rerenderHeader(idx, n) {
        const counterElement = document.body.querySelectorAll('.column_task_counter')[idx];
        if(n > MAX_TASKS) counterElement.textContent `${MAX_TASKS}+`;
        else counterElement.textContent = n;
    }

    return {
        render,
        addEventListener,
        rerenderHeader
    };
}

const MAX_TASKS = 99;
