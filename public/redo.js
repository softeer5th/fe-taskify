export default function redo() {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 16 14");
  svgElement.setAttribute("fill", "none");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", "M14.3333 5.66667H5C-0.333333 5.66667 -0.333333 13 5 13M14.3333 5.66667L9.66667 1M14.3333 5.66667L9.66667 10.3333");
  pathElement.setAttribute("stroke", "currentColor");
  pathElement.setAttribute("stroke-width", "1.5");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");

  svgElement.appendChild(pathElement);

  return svgElement;
}
