const scale = {
  grayscale: {
    50: "#FEFEFE",
    100: "#F7F7FC",
    200: "#EFF0F6",
    300: "#D9DBE9",
    400: "#BEC1D5",
    500: "#A0A3BD",
    600: "#6E7191",
    700: "#4E4B66",
    800: "#2A2A44",
    900: "#14142B",
  },
  accent: {
    blue: "#007AFF",
    red: "#FF3B30",
  },
};

export const colors = {
  text: {
    strong: scale.grayscale[900],
    bold: scale.grayscale[700],
    default: scale.grayscale[600],
    weak: scale.grayscale[500],
    white: {
      default: scale.grayscale[50],
      weak: scale.grayscale[100],
    },
    brand: scale.accent.blue,
    danger: scale.accent.red,
  },
  surface: {
    default: scale.grayscale[50],
    alt: scale.grayscale[100],
    brand: scale.accent.blue,
    danger: scale.accent.red,
  },
  border: {
    default: scale.grayscale[200],
    bold: scale.grayscale[400],
  },
};
