import React from "react";

import { ButtonHTMLAttributes } from "react";

import { Wrapper } from "./styles";

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  variant?: "link" | "default";
} & ButtonTypes;

const Button = ({ children, ...props }: ButtonProps) => (
  <Wrapper {...props}>{children}</Wrapper>
);

export default Button;
