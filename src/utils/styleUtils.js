export const colors = {
  grayscale50: '#FEFEFE',
  grayscale100: '#F7F7FC',
  grayscale200: '#EFF0F6',
  grayscale300: '#D9DBE9',
  grayscale400: '#BEC1D5',
  grayscale500: '#A0A3BD',
  grayscale600: '#6E7191',
  grayscale700: '#4E4B66',
  grayscale800: '#2A2A44',
  grayscale900: '#14142B',
  accentBlue: '#007AFF',
  accentRed: '#FF3B30',
};


export function setButtonColor(element, backgroundColor, textColor) {  
  if (backgroundColor in colors) {
    element.classList.add(`bg-${backgroundColor}`);
  }

  if (textColor in colors) {
    element.classList.add(`text-${textColor}`);
  }
}