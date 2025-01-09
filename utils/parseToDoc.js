const PARSER = new DOMParser();
export const parseToDoc = (componentHTML) => {
  const doc = PARSER.parseFromString(componentHTML, "text/html");
  const element = doc.body.firstChild;
  return element;
};
