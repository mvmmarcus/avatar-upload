import styled, { css } from "styled-components";

import { ButtonPros } from ".";

type WrapperProps = ButtonPros;

// const wrapperModifiers = {
//   small: (theme: DefaultTheme) => css``,
// };

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    border: none;
    height: ${theme.spacings.medium};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.medium};
    background-color: ${theme.colors.gray07};
    border: ${theme.border.radius};
    padding: 0.4rem ${theme.spacings.medium};
    border-radius: ${theme.font.sizes.medium};
  `}
`;
