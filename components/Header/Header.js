import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createHeader from "./ui/createHeader.js";

loadStyleSheet("/components/Header/styles.css");

const Header = () => {
  return createHeader();
};

export default Header;
