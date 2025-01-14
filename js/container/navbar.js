
import { navbarText } from "../components/nav/navbarText.js";
import { navbarButton } from "../components/nav/navbarButton.js";

export const Navbar = () => {
    const header = document.createElement("header");
    header.className = "nav-bar";

    const text = navbarText();
    header.appendChild(text);

    const button = navbarButton();
    header.appendChild(button);

    return header;
}