export default function arrowBoth() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", svgNS);

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M10.9167 12.6666V3.33331M10.9167 3.33331L12.6667 5.08331M10.9167 3.33331L9.16671 5.08331M5.08337 3.33331V12.6666M5.08337 12.6666L6.83337 10.9166M5.08337 12.6666L3.33337 10.9166"
  );
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  svg.appendChild(path);
  return svg;
}
