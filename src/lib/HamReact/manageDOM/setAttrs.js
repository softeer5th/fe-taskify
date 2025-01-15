const setAttrs = (props, events, element) => {
  if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
    return;
  }

  if (element.attributes?.length) {
    for (const attr of Object.values(element.attributes)) {
      const tmpAttrName = attr.name;

      if (props) {
        const propValue = `${props[tmpAttrName]}`;
        if (!propValue || propValue === "undefined") {
          element.removeAttribute(attr.name);
        } else if (Object.is(propValue, attr.value)) {
          delete props[tmpAttrName];
        }
      } else {
        element.removeAttribute(attr.name);
      }
    }
  }

  /**
   * 가상 돔의 props를 실제 돔에 설정합니다.
   */
  const setProps = () => {
    Object.entries(props).forEach(([key, value]) => {
      if (element.nodeName === "path" && (key === "stroke" || key === "fill")) {
        element.setAttribute(key, "current");
      } else if (key === "ref") {
        value.current = element;
      } else element.setAttribute(key, value.toString());
    });
  };

  /**
   * 가상 돔의 events를 실제 돔에 이벤트 리스너로 부착합니다.
   */
  const setEvents = () => {
    Object.entries(events).forEach(([key, value]) => {
      element.addEventListener(key, value);
    });
  };

  setProps();
  setEvents();
};

export default setAttrs;
