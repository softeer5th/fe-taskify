import { createElement } from "../../dom.js";
import loadStyleSheet from "../../utils/loadStyleSheet.js";
import createHistoryButton from "./ui/createHistoryButton.js";
import createLeftHeader from "./ui/createLeftHeader.js";

loadStyleSheet("/components/Header/styles.css");

const Header = () => {
  const $header = createElement("header", { className: "header" });
  const $leftHeader = createLeftHeader();
  const $historyButton = createHistoryButton();

  $header.append($leftHeader, $historyButton);
  return $header;
};

export default Header;
