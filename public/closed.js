export default function closed() {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 24 24");
  svgElement.setAttribute("fill", "none");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", "M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z");
  pathElement.setAttribute("fill", "currentColor");

  svgElement.appendChild(pathElement);

  return svgElement;
}
