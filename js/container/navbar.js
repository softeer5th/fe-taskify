
import { navbarText } from "../components/navbarText.js";
import { navbarButton } from "../components/navbarButton.js";

export const Navbar = () => {
    const header = document.createElement("header");
    header.className = "nav-bar";

    const text = navbarText();
    header.appendChild(text);
    
    const button = navbarButton();
    header.appendChild(button);

    return header;
}