import styled, { css, DefaultTheme } from "styled-components";
import media from "styled-media-query";

type ContentProps = {
  hasAvatar: boolean;
  isSuccess?: boolean;
};

const contentModifiers = {
  hasAvatar: (theme: DefaultTheme, isSuccess?: boolean) => css`
    align-items: ${isSuccess ? "center" : "flex-start"};
    margin-left: ${theme.spacings.xsmall};

    ${media.greaterThan("small")`
      margin-left: ${theme.spacings.medium};
    `}
  `,
};

export const Content = styled.div<ContentProps>`
  ${({ theme, hasAvatar, isSuccess = false }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${hasAvatar && contentModifiers.hasAvatar(theme, isSuccess)}
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  pointer-events: none;
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

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    pointer-events: none;
    line-height: ${theme.font.sizes.xxlarge};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
    color: ${theme.colors.red};
  `}
`;
