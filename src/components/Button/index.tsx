import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { Wrapper } from "./styles";

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonPros = {
  as?: React.ElementType;
} & ButtonTypes;

const Button = ({ children, ...props }: ButtonPros) => (
  <Wrapper {...props}>{!!children && <span>{children}</span>}</Wrapper>
);

export default Button;
