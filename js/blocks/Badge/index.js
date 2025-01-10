export function createBadge(text) {
    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.textContent = parseInt(text) > 99 ? '99+' : text;
    return badge;
}