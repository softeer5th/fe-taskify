export default function createImg ({ src, alt }) {
    const icon = document.createElement('img');
    icon.src = src;
    icon.alt = alt;

    return icon;
}