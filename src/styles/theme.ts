export default {
  border: {
    radius: "0.8rem",
    dashed: "0.2rem dashed #C7CDD3",
    activeDashed: "0.2rem dashed #3F80FF",
  },
  font: {
    family: "Inter, sans-serif",
    normal: 400,
    medium: 500,
    sizes: {
      xsmall: "1.2rem",
      small: "1.4rem",
      medium: "1.6rem",
      large: "1.8rem",
      xlarge: "2.0rem",
      xxlarge: "2.8rem",
    },
  },
  colors: {
    gray01: "#F2F5F8",
    gray04: "#C3CBD5",
    gray05: "#677489",
    gray06: "#495567",
    gray07: "#3D485F",

    blue01: "#3F80FF",
    blue04: "#B9D1FF",

    red: "#C64D32",
  },
  spacings: {
    xxsmall: "0.8rem",
    xsmall: "1.6rem",
    small: "2.4rem",
    medium: "3.2rem",
    large: "4.0rem",
    xlarge: "4.8rem",
    xxlarge: "5.6rem",
  },
  transition: {
    default: "0.3s ease-in-out",
    fast: "0.1s ease-in-out",
  },
} as const;
