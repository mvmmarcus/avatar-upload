import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    border: {
      radius: string;
      dashed: string;
      activeDashed: string;
    };
    font: {
      family: string;
      normal: number;
      medium: number;
      sizes: {
        xsmall: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
      };
    };
    colors: {
      gray01: string;
      gray04: string;
      gray05: string;
      gray06: string;
      gray07: string;
      blue01: string;
      blue04: string;
      red: string;
    };
    spacings: {
      xxsmall: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
    transition: {
      default: string;
      fast: string;
    };
  }
}
