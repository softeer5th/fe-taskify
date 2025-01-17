export default function HeaderComponent() {

    const sortText = {
        "1": '생성 순',
        "-1": '최신 순'
    }

    function template() {
        return `
            <span>
                <h1 class="text-strong display-bold24">TASKIFY</h1>
                <button id="sort_button" class="border-bord rounded-100 display-medium12 text-bold">
                    <img width="16" height="16" src="/public/icon/arrowBoth.svg"/>
                    <span>생성 순</span>
                </button>
            </span>
            <button id="log_button">
                <img draggable="false" width="24" height="24" src="/public/icon/clock.svg" />
            </button>
            `;
    }

    function render() {
        const headerElement = document.createElement('header');
        headerElement.innerHTML =  template();
        return headerElement;
    }

    function addListener(headerElement, handleSort, handleLog) {
        const [sortButton, logButton] = headerElement.getElementsByTagName('button');
        
        sortButton.addEventListener('click', ()=>{
            const order = String(handleSort());
            sortButton.querySelector('span').textContent = sortText[order];
        });
        logButton.addEventListener('click', handleLog);
    }

    return {
        render,
        addListener
    };
}
