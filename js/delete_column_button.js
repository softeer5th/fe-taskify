export function deleteColumnButton() {
    const newDiv = document.createElement('button');
    newDiv.id = 'delete-column-button';
    newDiv.className = 'icon-button material-icons'
    newDiv.innerHTML = `delete`;
    return newDiv;
}