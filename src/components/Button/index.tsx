import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { Wrapper } from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonPros = {
  as?: React.ElementType;
  variant?: "link" | "default";
} & ButtonTypes;

const Button = ({ children, ...props }: ButtonPros) => (
  <Wrapper {...props}>{children}</Wrapper>
);

export default Button;
