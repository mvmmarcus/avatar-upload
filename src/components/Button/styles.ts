import styled, { css, DefaultTheme } from "styled-components";

import { ButtonPros } from ".";

type WrapperProps = ButtonPros;

const wrapperModifiers = {
  link: (theme: DefaultTheme) => css`
    background: transparent;
    text-decoration: underline;
    padding: 0;
    font-size: ${theme.font.sizes.medium};
    line-height: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.medium};
    color: ${theme.colors.gray07};

    &:hover {
      background-color: transparent;
      color: ${theme.colors.gray05};
    }
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, variant }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    border: none;
    transition: background 0.3s ease-in-out;
    height: ${theme.spacings.medium};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.medium};
    background-color: ${theme.colors.gray07};
    border: ${theme.border.radius};
    padding: 0.4rem ${theme.spacings.medium};
    border-radius: ${theme.font.sizes.medium};

    &:hover {
      background-color: ${theme.colors.gray05};
    }

    ${variant === "link" && wrapperModifiers.link(theme)}
  `}
`;
