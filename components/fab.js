export default function FabComponent() {
    function template(icon) {
        return `
            <img src='/public/icon/${icon}.svg' width="32" height="32"/>
        `
    }

    function render(icon, background) {
        const buttonElement = document.createElement('button');
        buttonElement.classList = `rounded-500 flex-center shadow-up fab_button ${background}`;
        buttonElement.innerHTML = template(icon);

        return buttonElement
    }

    function addListener(buttonElement, handleClick) {
        buttonElement.addEventListener('click', handleClick);
    }

    return {
        render,
        addListener
    }
}