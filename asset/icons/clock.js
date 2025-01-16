export default function clock() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");

  const path1 = document.createElementNS(svgNS, "path");
  path1.setAttribute("d", "M12 7.8V12H16.2");
  path1.setAttribute("stroke", "currentColor");
  path1.setAttribute("stroke-width", "1.5");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");

  const path2 = document.createElementNS(svgNS, "path");
  path2.setAttribute("d", "M12 19C15.8661 19 19 15.8661 19 12C19 8.1339 15.8661 5 12 5C8.1339 5 5 8.1339 5 12C5 15.8661 8.1339 19 12 19Z");
  path2.setAttribute("stroke", "currentColor");
  path2.setAttribute("stroke-width", "1.5");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");

  svg.appendChild(path1);
  svg.appendChild(path2);

  return svg;
}
