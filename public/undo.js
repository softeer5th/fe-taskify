export default function undo() {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 16 14");
  svgElement.setAttribute("fill", "none");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", "M1 5.66667H10.3333C15.6667 5.66667 15.6667 13 10.3333 13M1 5.66667L5.66667 1M1 5.66667L5.66667 10.3333");
  pathElement.setAttribute("stroke", "currentColor");
  pathElement.setAttribute("stroke-width", "1.5");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");

  svgElement.appendChild(pathElement);

  return svgElement;
}
