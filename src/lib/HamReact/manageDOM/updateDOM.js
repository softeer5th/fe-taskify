import {
  getNewVDOM, getRoot, getVDOM, setVDOM,
} from "../manageVDOM/index.js";
import { resetStateId } from "../store.js";

import { createDOM } from "./createDOM.js";
import setAttrs from "./setAttrs.js";

const isChanged = (initVDOM, newVDOM) => {
  const isTextInitVDOM = initVDOM.type === "text";
  const isTextNewVDOM = newVDOM.type === "text";

  return (
    isTextInitVDOM !== isTextNewVDOM
    || (isTextInitVDOM && isTextNewVDOM && !Object.is(initVDOM.value, newVDOM.value))
    || (!isTextInitVDOM && !isTextNewVDOM && !Object.is(initVDOM?.type, newVDOM?.type))
  );
};

const findLongerChildren = (dom1, dom2) => {
  const dom1Length = dom1.children?.length || 0;
  const dom2Length = dom2.children?.length || 0;

  if (dom1Length > dom2Length) return dom1;
  return dom2;
};

const updateElement = ($parent, newVDOM, initVDOM) => {
  const $current = initVDOM?.current;

  if (!initVDOM || (initVDOM.type === "text" && !initVDOM.value)) {
    const $next = createDOM(newVDOM);
    if ($next) $parent.appendChild($next);
  } else if (!newVDOM || (newVDOM.type === "text" && !newVDOM.value)) {
    if ($current) $parent.removeChild($current);
  } else if (isChanged(initVDOM, newVDOM)) {
    const $next = createDOM(newVDOM);
    if ($current && $next) {
      $current.replaceWith($next);
      newVDOM.current = $next;
    }
  } else {
    newVDOM.current = $current;
    if (initVDOM.type !== "text" && newVDOM.type !== "text") {
      findLongerChildren(initVDOM, newVDOM).children?.forEach((_, i) => {
        if ($current) updateElement($current, newVDOM.children?.[i], initVDOM.children?.[i]);
      });
    }
  }

  if (newVDOM && newVDOM.type !== "text") {
    setAttrs(newVDOM.props, newVDOM.events, $current, newVDOM.current);
  }
};

export const updateDOM = (
  $parent = getRoot(),
  newVDOM = getNewVDOM(),
  initVDOM = getVDOM(),
) => {
  resetStateId();
  updateElement($parent, newVDOM, initVDOM);
  setVDOM(newVDOM);
};
