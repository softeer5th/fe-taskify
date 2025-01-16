export const useClickOutside = (ref, handler) => {
  const listener = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  document.addEventListener("mousedown", listener);

  return () => {
    document.removeEventListener("mousedown", listener);
  };
};
