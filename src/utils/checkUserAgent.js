export const checkUserAgent = () => {
  const isMobile = /Mobi/i.test(navigator.userAgent);
  if (isMobile) return "mobile";
  return "pc";
};
