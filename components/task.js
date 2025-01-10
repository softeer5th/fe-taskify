export default function TaskComponent() {

    // Task 컴포넌트 템플릿
    function template({title, content}) {
        return `
            <div class="card_text_container">
                <h4 class="text-strong display-bold14">${title}</h4>
                <p class="text-weak display-medium14">${content}</p>
            </div>
            <div class="card_button_container">
                <button>
                    <img draggable="false" width="24" height="24" src="/public/icon/closed.svg"/>
                </button>
                <button>
                    <img draggable="false" width="24" height="24" src="/public/icon/edit.svg"/>
                </button>
            </div>
        `;
    }

    // Task 컴포넌트 내부 교체 렌더링 함수
    // currentElement : 현재 Element
    // tobeElement : 새로운 Element
    function renderSwap(currentElement, tobeElement) {
        const parentNode = currentElement.parentNode;
        parentNode.replaceChild(tobeElement, currentElement);
    }
    
    // Task 컴포넌트 렌더링 함수
    function render(task) {
        const { title, content, created, column } = task;

        // 새 카드 컴포넌트 생성
        const newTaskElement = document.createElement("li");
        newTaskElement.setAttribute(
            "class",
            "card surface-default shadow-normal rounded-100"
        );
        newTaskElement.setAttribute("draggable", "true");
        newTaskElement.innerHTML = template({ title, content });

        return newTaskElement;
    };

    // Task 컴포넌트 이벤트 등록 함수
    // handleRemove : closed 버튼 클릭 callback
    // handleUpdate : edit 버튼 클릭 callback
    function addEventListener(taskElement, handleRemove, handleUpdate) {
        taskElement.addEventListener("dragstart", ()=>{});

        const buttons = taskElement.getElementsByTagName("button");
        const [deleteButton, editButton] = buttons;
        deleteButton.addEventListener("click", handleRemove );
        editButton.addEventListener("click", handleUpdate );   
    }

    return {
        render,
        addEventListener,
        renderSwap,
    }
}