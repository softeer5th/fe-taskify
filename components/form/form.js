export default function FormComponent() {
    // onEvent : 내장 이벤트 핸들러
    // handleEvent : 파라미터로 입력받는 이벤트 핸들러

    // Form 컴포넌트 템플릿
    function template() {
        return `
                <form class="card_form card surface-default shadow-normal rounded-100">
                    <input name="title" class="text-strong display-bold14" type="text" placeholder="제목을 입력하세요" maxlength="500" />
                    <input name="content" class="text-default display-medium14" type="text" placeholder="내용을 입력하세요" maxlength="500" />
                    <span>
                        <button class="rounded-100 surface-alt text-default display-bold14" type="button">취소</button>
                        <button class="rounded-100 surface-brand text-white-default display-bold14 disabled" disabled type="submit">제출</button>
                    </span>
                </form>
            `;
    }

    // Task Create를 위한 Form 컴포넌트 렌더링 함수
    function render() {
        const cardElement = document.createElement("li");
        cardElement.innerHTML = template();

        const formElement = cardElement.firstElementChild;
        return {cardElement, formElement};
    }

    // render로 생성된 Form에 submit, cancel, change 이벤트 등록 함수
    // handleSubmit : Task 생성을 위한 정보를 submit하는 callback 함수
    function addAddListener(formElement, handleSubmit) {
        const [cancelButton, submitButton] =
            formElement.getElementsByTagName("button");
        formElement.addEventListener("submit", (e) => onSubmit(e, handleSubmit));
        formElement.addEventListener("change", onChange);
        cancelButton.addEventListener("click", onCancel);
    }

    // Task Update시, Form의 기본 값을 task의 정보로 초기화
    function initEdit(cardElement, task) {
        const formElement = cardElement.firstElementChild;
        const {title, content, column, created} = task;
        const [titleInput, contentInput] = formElement.getElementsByTagName('input');

        titleInput.value = title;
        contentInput.value = content;
    }

    // Task Update를 위한 Form Component 렌더링 함수
    function renderEdit(task) {
        const {title, content, column, created} = task;

        const cardElement = document.createElement("li");
        cardElement.innerHTML = template();
        
        initEdit(cardElement, task)

        return cardElement;
    }

    // renderEdit으로 생성된 Form에 submit, cancel, change 이벤트 등록 함수
    // handleSubmit : Task 수정을 위한 정보를 submit하는 callback 함수
    // handleCancel : Task 수정을 취소하는 callback 함수
    function addUpdateListener(formElement, handleSubmit, handleCancel) {
        const [cancelButton, submitButton] =
            formElement.getElementsByTagName("button");
        submitButton.removeAttribute("disabled");
        submitButton.classList.remove("disabled");

        formElement.addEventListener("submit", handleSubmit);
        formElement.addEventListener("change", onChange);

        cancelButton.addEventListener("click", handleCancel);
    }

    // Form의 change를 처리하는 handler
    // Form에 입력된 title 또는 content의 길이가 0인 경우, submit 버튼 클릭 방지
    function onChange(e) {
        const form = e.target.parentNode;

        const title = form.title.value;
        const content = form.content.value;

        const [cancelButton, editButton] = form.getElementsByTagName("button");

        const currentDisabled = Boolean(editButton.disabled);
        if (title.length !== 0 && content.length !== 0) {
            if (currentDisabled) {
                editButton.classList.remove("disabled");
                editButton.disabled = false;
            }
        } else {
            if (!currentDisabled) {
                editButton.classList.add("disabled");
                editButton.disabled = true;
            }
        }
    }

    // Task 생성 시, 입력받은 정보를 외부 handler에 전달 및 
    function onSubmit(e, handleSubmit) {
        // 새로고침 방지
        e.preventDefault();
        const self = e.target;
        const title = self.title.value;
        const content = self.content.value;

        self.parentNode.removeChild(self);

        handleSubmit(title, content);
    }

    // Task 생성을 취소 시, FormElement를 삭제
    function onCancel(e) {
        const formElement = e.target.parentNode.parentNode;
        formElement.parentNode.removeChild(formElement);
    }

    return { render,initEdit, renderEdit, addAddListener, addUpdateListener };
}
