import styled, { css, DefaultTheme } from "styled-components";

type ContentProps = {
  hasAvatar: boolean;
};

const contentModifiers = {
  hasAvatar: (theme: DefaultTheme) => css`
    align-items: flex-start;
    margin-left: ${theme.spacings.medium};
  `,
};

export const Content = styled.div<ContentProps>`
  ${({ theme, hasAvatar }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${hasAvatar && contentModifiers.hasAvatar(theme)}
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const TitleIcon = styled.img`
  ${({ theme }) => css`
    margin-right: ${theme.font.sizes.xsmall};
  `}
`;

export const Title = styled.p`
  ${({ theme }) => css`
    line-height: 2.5rem;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.medium};
    color: ${theme.colors.gray06};
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    line-height: 2.5rem;
    pointer-events: none;
    text-align: center;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.normal};
    color: ${theme.colors.gray05};
  `}
`;

export const ErrorMessage = styled.p``;
