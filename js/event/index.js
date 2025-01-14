export const initializeGlobalInputEvents = () => {
    document.addEventListener('input', (event) => {
        const target = event.target;

        if (target.tagName === 'TEXTAREA') {
            const card = target.closest('.card-template');
            const textarea = card.querySelector('textarea');
            textarea.style.height = '0';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            const card = target.closest('.card-template');
            const inputsFilled = [card.querySelector('input'), card.querySelector('textarea')].every(
                (input) => input.value !== ''
            );
            const cardSubmitButton = card.querySelector('.card-button-submit');
            cardSubmitButton.disabled = !inputsFilled;
        }
    });
};