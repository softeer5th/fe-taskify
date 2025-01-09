export function loadCss(file) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = file;
    document.head.appendChild(link);
}
  