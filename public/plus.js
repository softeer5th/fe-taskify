export default function plus() {
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 16 16");
  svgElement.setAttribute("fill", "none");
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", "M12.6667 8.66533H8.66668V12.6653H7.33334V8.66533H3.33334V7.332H7.33334V3.332H8.66668V7.332H12.6667V8.66533Z");
  pathElement.setAttribute("fill", "currentColor");

  svgElement.appendChild(pathElement);

  return svgElement;
}
