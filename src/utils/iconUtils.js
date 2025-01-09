import { colors} from './styleUtils.js';

export function getIconSVG(iconType, color = 'currentColor') {
  switch (iconType) {
    case 'plus':
      return `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 7.99799H8V13.998H6V7.99799H0V5.99799H6V-0.00201416H8V5.99799H14V7.99799Z" fill="${colors[color]}"/>
        </svg>
      `;
    case 'redo':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3333 10.6667H9C3.66667 10.6667 3.66667 18 9 18M18.3333 10.6667L13.6667 6M18.3333 10.6667L13.6667 15.3333" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case 'undo':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10.6667H14.3333C19.6667 10.6667 19.6667 18 14.3333 18M5 10.6667L9.66667 6M5 10.6667L9.66667 15.3333" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case 'history':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7.8V12H16.2" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 19C15.8661 19 19 15.8661 19 12C19 8.1339 15.8661 5 12 5C8.1339 5 5 8.1339 5 12C5 15.8661 8.1339 19 12 19Z" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case 'edit':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.727 6.72708L14.9642 5.48991C15.1194 5.33459 15.3038 5.21139 15.5066 5.12733C15.7095 5.04327 15.927 5 16.1466 5C16.3662 5 16.5836 5.04327 16.7865 5.12733C16.9894 5.21139 17.1737 5.33459 17.329 5.48991L18.511 6.67191C18.8244 6.98542 19.0005 7.41059 19.0005 7.8539C19.0005 8.29722 18.8244 8.72238 18.511 9.0359L17.2738 10.2731M13.727 6.72708L5.68877 14.7645C5.41122 15.042 5.24018 15.4084 5.2056 15.7994L5.00331 18.0898C4.99244 18.2115 5.00842 18.3342 5.0501 18.4491C5.09178 18.564 5.15816 18.6684 5.24456 18.7549C5.33096 18.8414 5.43528 18.9078 5.55016 18.9496C5.66503 18.9914 5.78768 19.0075 5.90945 18.9968L8.19988 18.7945C8.59145 18.7603 8.95845 18.5892 9.23642 18.3113L17.2738 10.2731M13.727 6.72708L17.2738 10.2731" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      `;
    case 'close':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z" fill="#6E7191"/>
        </svg>
    `;
    case 'arrow':
      return `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${colors[color]}" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.375 19V5M16.375 5L19 7.625M16.375 5L13.75 7.625M7.625 5V19M7.625 19L10.25 16.375M7.625 19L5 16.375" stroke="#6E7191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    default:
      return 
  }
}
