export const createElement = (type, config, ...children) => {
  const formatConfigs = () => {
    const props = {};
    const events = {};

    for (const propName in config) {
      if (propName.startsWith("on")) {
        const eventName = propName.slice(2).toLowerCase();
        events[eventName] = config[propName];
      } else props[propName] = config[propName];
    }

    return { props, events };
  };

  const formatChildren = () => children.flat().map((child) => {
    const childType = typeof child;
    if (childType === "object") return child;
    const value = childType === "string" || childType === "number"
      ? `${child}`
      : "";
    return { type: "text", value, current: undefined };
  });

  const vDOMChildren = formatChildren();
  const { props, events } = formatConfigs();

  return {
    type,
    props,
    events,
    children: vDOMChildren,
    current: undefined,
  };
};
