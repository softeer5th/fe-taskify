export default function createImg({ src, alt, classList = [] }) {
  const iconImg = document.createElement("img");
  iconImg.src = src;
  iconImg.alt = alt;
  for (const c of classList) {
    iconImg.classList.add(c);
  }

  return iconImg;
}
